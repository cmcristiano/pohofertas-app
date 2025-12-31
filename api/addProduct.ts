import { NextRequest, NextResponse } from 'next/server';

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

export async function POST(req: NextRequest) {
  try {
    // Validar token
    const token = req.headers.get('authorization')?.split('Bearer ')[1];
    const adminToken = process.env.ADMIN_TOKEN;

    if (!token || token !== adminToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const productData: ProductData = await req.json();

    // Validar dados obrigatórios
    if (!productData.link || !productData.image || !productData.newPrice || !productData.category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Inicializar Octokit com GitHub token
    const { Octokit } = await import('@octokit/rest');
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });

    // Ler arquivo constants.ts
    const { data: fileData } = await octokit.repos.getContent({
      owner: 'cmcristiano',
      repo: 'pohofertas-app',
      path: 'src/constants.ts',
    }) as any;

    const fileContent = Buffer.from(fileData.content as string, 'base64').toString('utf-8');

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

    // Adicionar novo produto antes do fechamento do array
    const newContent = fileContent.replace(
      /export const PRODUCTS = \[(\s*)(.*?)(\s*)\];/s,
      `export const PRODUCTS = [\n$2\n${newProduct}\n];`
    );

    // Fazer commit no GitHub
    await octokit.repos.createOrUpdateFileContents({
      owner: 'cmcristiano',
      repo: 'pohofertas-app',
      path: 'src/constants.ts',
      message: `feat: Add product "${productData.title}" (${productData.category})`,
      content: Buffer.from(newContent).toString('base64'),
      sha: (fileData as any).sha as string,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Product added successfully',
        productId: newId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
