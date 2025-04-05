import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  try {
    // Inicializa o cliente Supabase usando cookies para manter a sessão
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req: request, res });

    // Verificar a sessão apenas para configurar os cookies
    await supabase.auth.getSession();

    // Permitir o acesso e deixar o redirecionamento ser tratado pelo cliente
    return res;
  } catch (error) {
    console.error('Erro no middleware:', error);
    return NextResponse.next();
  }
}

// Executar o middleware apenas nestas rotas
export const config = {
  matcher: ['/admin/:path*'],
}; 