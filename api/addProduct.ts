import { Octokit } from "@octokit/rest";

interface ProductData {
  link: string;
  image: string;
  newPrice: number;
  oldPrice: number;
  category: string;
  store: string;
  title: string;
  discount: number;
  validity: string;
}

export default async function handler(req, res) {
  // Apenas POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Validar token
  const { ADMIN_TOKEN } = process.env;
  const token = req.headers["authorization"]?.split("Bearer ")[1];

  if (!token || token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const productData: ProductData = req.body;

    // Validar dados obrigatórios
    if (!productData.link || !productData.image || !productData.newPrice || !productData.category) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Inicializar Octokit com GitHub token
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });

    // Ler arquivo constants.ts
    const { data: fileData } = await octokit.repos.getContent({
      owner: "cmcristiano",
      repo: "pohofertas-app",
      path: "src/constants.ts",
    });

    const fileContent = Buffer.from(fileData.content as string, "base64").toString("utf-8");

    // Extrair array PRODUCTS
    const productsMatch = fileContent.match(/export const PRODUCTS = \[([\s\S]*?)\];/);
    if (!productsMatch) {
      return res.status(500).json({ error: "Could not parse PRODUCTS array" });
    }

    // Criar novo produto com ID único
    const newId = Math.max(...fileContent.match(/id: (\d+)/g).map(m => parseInt(m.match(/\d+/)[0])), 0) + 1;

    const newProduct = `  {
    id: ${newId},
    title: "${productData.title.replace(/"/g, '\\"')}",
    image: "${productData.image}",
    newPrice: ${productData.newPrice},
    oldPrice: ${productData.oldPrice},
    discount: ${productData.discount},
    category: "${productData.category}",
    store: "${productData.store}",
    link: "${productData.link}",
    validity: "${productData.validity}",
  },`;

    // Adicionar novo produto ao array
    const newContent = fileContent.replace(
      /export const PRODUCTS = \[([\s\S]*?)\];/,
      `export const PRODUCTS = [\n${productsMatch[1]}\n${newProduct}\n];`
    );

    // Fazer commit no GitHub
    await octokit.repos.createOrUpdateFileContents({
      owner: "cmcristiano",
      repo: "pohofertas-app",
      path: "src/constants.ts",
      message: `Add: New product "${productData.title}" - ${productData.category}`,
      content: Buffer.from(newContent).toString("base64"),
      sha: fileData.sha as string,
    });

    return res.status(200).json({
      success: true,
      message: "Product added successfully",
      productId: newId,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}
