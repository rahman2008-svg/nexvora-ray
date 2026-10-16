import Prism from 'prismjs';

// Import essential languages for Prism in strict dependency order:
// 1. clike is base for c, java, etc.
import 'prismjs/components/prism-clike';
// 2. c extends clike (required by cpp)
import 'prismjs/components/prism-c';
// 3. cpp extends c
import 'prismjs/components/prism-cpp';
// 4. markup is base for html, xml, svg, jsx, markdown
import 'prismjs/components/prism-markup';
// 5. css
import 'prismjs/components/prism-css';
// 6. javascript
import 'prismjs/components/prism-javascript';
// 7. jsx extends markup & javascript
import 'prismjs/components/prism-jsx';
// 8. typescript extends javascript
import 'prismjs/components/prism-typescript';
// 9. tsx extends jsx & typescript
import 'prismjs/components/prism-tsx';
// 10. other independent/clike-dependent languages
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markdown';

export function highlightCode(code: string, language: string): string {
  const normalizedLang = language.toLowerCase();
  let grammar = Prism.languages[normalizedLang];

  if (!grammar) {
    if (normalizedLang === 'typescript' || normalizedLang === 'ts') {
      grammar = Prism.languages.typescript || Prism.languages.javascript;
    } else if (normalizedLang === 'javascript' || normalizedLang === 'js') {
      grammar = Prism.languages.javascript;
    } else if (normalizedLang === 'html') {
      grammar = Prism.languages.markup;
    } else if (normalizedLang === 'bash' || normalizedLang === 'sh') {
      grammar = Prism.languages.bash;
    } else if (normalizedLang === 'cpp' || normalizedLang === 'c++') {
      grammar = Prism.languages.cpp || Prism.languages.c || Prism.languages.clike;
    } else {
      grammar = Prism.languages.clike || Prism.languages.javascript;
    }
  }

  if (!grammar) {
    return escapeHtml(code);
  }

  try {
    return Prism.highlight(code, grammar, normalizedLang);
  } catch (err) {
    console.warn('Prism highlight error, fallback to raw escaped code', err);
    return escapeHtml(code);
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
