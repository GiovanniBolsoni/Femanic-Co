import { useEffect } from 'react';

const NOME_SITE = 'Femanic & Co.';

function upsertMeta(seletor, atributos) {
  let elemento = document.querySelector(seletor);
  if (!elemento) {
    elemento = document.createElement('meta');
    Object.entries(atributos).forEach(([chave, valor]) => {
      if (chave !== 'content') elemento.setAttribute(chave, valor);
    });
    document.head.appendChild(elemento);
  }
  elemento.setAttribute('content', atributos.content);
}

export function useSeo({ title, description, image, structuredData }) {
  useEffect(() => {
    const tituloCompleto = title ? `${title} | ${NOME_SITE}` : NOME_SITE;
    document.title = tituloCompleto;

    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: tituloCompleto });

    if (description) {
      upsertMeta('meta[name="description"]', { name: 'description', content: description });
      upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    }

    if (image) {
      upsertMeta('meta[property="og:image"]', { property: 'og:image', content: image });
    }

    let script = document.getElementById('dados-estruturados');
    if (structuredData) {
      if (!script) {
        script = document.createElement('script');
        script.id = 'dados-estruturados';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    } else if (script) {
      script.remove();
    }
  }, [title, description, image, structuredData]);
}
