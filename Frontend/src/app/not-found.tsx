'use client'

import { useEffect } from 'react';
import { redirect } from 'next/navigation';

//* Redireciona qualquer rota não encontrada para a /movies

export default function NotFoundPage() {
    useEffect(() => { redirect('/movies'); }, []);
    return null;
};