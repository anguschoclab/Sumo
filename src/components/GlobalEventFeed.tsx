import React, { useEffect, useRef, useState } from 'react';
import { EventMessage, subscribe } from '../engine/events';
import '../styles/feed.css';

type Props = { defaultOpen?: boolean };

export default function GlobalEventFeed({ defaultOpen = true }: Props) {
  const [open, setOpen] = useState<boolean>(() => {
    const saved = localStorage.getItem('feed_open');
    return saved === null ? defaultOpen : saved === '1';
  });
  const [items, setItems] = useState<EventMessage[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return subscribe((msg) => {
      if (msg.type === 'ui/toggle-feed') {
        setOpen(v => {
          const nv = !v;
          localStorage.setItem('feed_open', nv ? '1' : '0');
          return nv;
        });
        return;
      }
      setItems(prev => {
        const next = [...prev, msg].slice(-300);
        return next;
      });
    });
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [items, open]);

  return (
    <aside className={`feed ${open ? 'open' : 'closed'}`}>
      <header className="feed__hdr">
        <strong>Event Feed</strong>
        <button className="feed__toggle" onClick={() => {
          setOpen(v => {
            const nv = !v;
            localStorage.setItem('feed_open', nv ? '1' : '0');
            return nv;
          });
        }}>{open ? 'Collapse' : 'Open'}</button>
      </header>
      {open && (
        <div className="feed__list">
          {items.map((it, i) => (
            <div key={i} className={`feed__item ${it.severity ?? 'info'}`}>
              <span className="feed__time">{new Date(it.ts).toLocaleTimeString()}</span>
              <span className="feed__text">{it.text}</span>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      )}
    </aside>
  );
}
