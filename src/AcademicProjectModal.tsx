import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Code2, Lightbulb, X } from 'lucide-react';
import type { AcademicProject } from './data/portfolio';

export function AcademicProjectModal({ project, onClose }: { project: AcademicProject; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current!;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      trigger?.focus({ preventScroll: true });
    };
  }, []);

  return <dialog ref={dialogRef} className="academic-modal" aria-labelledby="academic-modal-title"
    onCancel={event => { event.preventDefault(); onClose(); }}
    onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="academic-modal-content">
      <header className="academic-modal-header">
        <div><span className="section-label">PROJETO ACADÊMICO · {project.category}</span><h2 id="academic-modal-title">{project.title}</h2></div>
        <button className="modal-close" onClick={onClose} aria-label="Fechar detalhes do projeto" autoFocus><X size={22} /></button>
      </header>
      <p className="modal-description">{project.description}</p>
      <div className="modal-panels">
        <section className="modal-panel"><Code2 size={24} aria-hidden="true" /><h3>Como funciona</h3><p>{project.howItWorks}</p></section>
        <section className="modal-panel impact-panel"><Lightbulb size={24} aria-hidden="true" /><h3>Impacto para o negócio</h3><span className="modal-impact-label">APLICAÇÃO POTENCIAL</span><p>{project.businessImpact}</p></section>
      </div>
      {project.image && !imageFailed ? <figure className="modal-image"><img src={project.image.src.startsWith('http') ? project.image.src : `${import.meta.env.BASE_URL}${project.image.src.replace(/^\//, '')}`} alt={project.image.alt} onError={() => setImageFailed(true)} /></figure> :
        <section className="modal-flow" aria-label="Visão geral do projeto"><span className="small-label">DO PROBLEMA À SOLUÇÃO</span><ol>{project.steps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span>{step}</li>)}</ol></section>}
      <section className="modal-tools"><h3>Ferramentas e conceitos</h3><div className="flex flex-wrap gap-2">{project.tools.map(tool => <span className="tag" key={tool}>{tool}</span>)}</div></section>
      <footer className="modal-footer"><span>Explore o código e a documentação.</span><a className="button button-primary" href={project.url} target="_blank" rel="noreferrer">Abrir repositório no GitHub <ArrowUpRight size={17} /></a></footer>
    </div>
  </dialog>;
}
