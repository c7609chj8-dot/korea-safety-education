'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { galleryPhotos } from '../lib/education-photos';

export function PhotoGallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isOpen = selected !== null;
  const photo = selected === null ? null : galleryPhotos[selected];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog) return;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
    };
  }, [isOpen]);

  function move(direction: number) {
    setSelected(value => value === null ? null : (value + direction + galleryPhotos.length) % galleryPhotos.length);
  }

  return <>
    <div className="facility-grid">
      {galleryPhotos.map((item, index) => <article className="facility-card" key={item.file}>
        <button className="facility-image" type="button" aria-label={`${item.title} 사진 크게 보기`} aria-haspopup="dialog" onClick={() => setSelected(index)}>
          <Image src={`/images/center/${item.file}`} alt={item.alt} width={item.width} height={item.height} style={{ objectPosition: item.position }} sizes="(max-width: 800px) calc(100vw - 40px), (max-width: 1280px) 30vw, 370px" />
          <span className="photo-enlarge" aria-hidden="true">크게 보기 ↗</span>
        </button>
        <div><h3>{item.title}</h3><p>{item.text}</p></div>
      </article>)}
    </div>
    <dialog className="photo-dialog" ref={dialogRef} aria-labelledby="photo-dialog-title" aria-describedby="photo-dialog-description" onClose={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) setSelected(null); }} onKeyDown={event => {
      if (event.key === 'Tab') {
        const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('button'));
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (event.shiftKey && event.target === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && event.target === last) {
          event.preventDefault();
          first?.focus();
        }
      }
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        move(event.key === 'ArrowLeft' ? -1 : 1);
      }
    }}>
      {photo ? <div className="photo-dialog-content">
        <div className="photo-dialog-heading"><div><p>{selected! + 1} / {galleryPhotos.length} · 실제 교육 현장</p><h2 id="photo-dialog-title">{photo.title}</h2></div><button type="button" className="photo-close" autoFocus onClick={() => setSelected(null)}>닫기 <span aria-hidden="true">×</span></button></div>
        <div className="photo-dialog-stage"><Image src={`/images/center/${photo.file}`} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 800px) calc(100vw - 32px), 1000px" /></div>
        <p id="photo-dialog-description" className="photo-dialog-description" aria-live="polite">{photo.text}</p>
        <div className="photo-dialog-navigation"><button type="button" onClick={() => move(-1)}>← 이전 사진</button><button type="button" onClick={() => move(1)}>다음 사진 →</button></div>
      </div> : null}
    </dialog>
  </>;
}
