import type { NextApiRequest, NextApiResponse } from 'next';

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Validar token
    const token = req.headers.authorization?.split('Bearer ')[1];
    const adminToken = process.env.ADMIN_TOKEN;

    if (!token || token !== adminToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const productData: ProductData = req.body;

    // Validar dados obrigatórios
    if (!productData.link || !productData.image || !productData.newPrice || !productData.category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Importar Octokit
    const { Octokit } = await import('@octokit/rest');
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });

    // Ler arquivo constants.ts
    const fileData = await octokit.repos.getContent({
      owner: 'cmcristiano',
      repo: 'pohofertas-app',
      path: 'src/constants.ts',
    });

    const fileContent = Buffer.from(
      (fileData.data as any).content,
      'base64'
    ).toString('utf-8');

    // Extrair próximo ID
    const idMatches = fileContent.match(/id: (\d+)/g) || [];
    const ids = idMatches.map(m => parseInt(m.match(/\d+/)![0]));
    const newId = Math.max(...ids, 0) + 1;

    // Criar novo produto
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

    // Adicionar novo produto
    const newContent = fileContent.replace(
      /export const PRODUCTS = \[([\s\S]*?)\];/,
      `export const PRODUCTS = [$1\n${newProduct}\n];`
    );

    // Fazer commit no GitHub
    await octokit.repos.createOrUpdateFileContents({
      owner: 'cmcristiano',
      repo: 'pohofertas-app',
      path: 'src/constants.ts',
      message: `feat: Add product "${productData.title}" (${productData.category})`,
      content: Buffer.from(newContent).toString('base64'),
      sha: (fileData.data as any).sha,
    });

    return res.status(200).json({
      success: true,
      message: 'Product added successfully',
      productId: newId,
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Internal server error',
    });
  }
}
