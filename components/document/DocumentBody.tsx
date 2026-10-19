import { Quote } from 'lucide-react';
import type { DocBlock, DocSection } from './types';

function Block({ block }: { block: DocBlock }) {
  switch (block.type) {
    case 'paragraph':
      return <p className="leading-relaxed text-foreground/90">{block.text}</p>;

    case 'list': {
      const ListTag = block.ordered ? 'ol' : 'ul';
      return (
        <ListTag
          className={
            block.ordered
              ? 'list-decimal space-y-3 pl-5 marker:font-semibold marker:text-primary dark:marker:text-blue-300'
              : 'list-none space-y-3'
          }
        >
          {block.items.map((item, index) => (
            <li
              key={index}
              className={
                block.ordered
                  ? 'pl-1 leading-relaxed text-foreground/90'
                  : 'relative pl-5 leading-relaxed text-foreground/90 before:absolute before:left-0 before:top-[0.6em] before:h-2 before:w-2 before:rounded-full before:bg-secondary'
              }
            >
              {item.title && (
                <span className="font-semibold text-foreground">
                  {item.title}:{' '}
                </span>
              )}
              {item.text}
            </li>
          ))}
        </ListTag>
      );
    }

    case 'quote':
      return (
        <figure className="rounded-lg border-l-4 border-secondary bg-muted/40 p-5">
          <Quote className="mb-2 h-5 w-5 text-secondary" aria-hidden />
          <blockquote className="italic leading-relaxed">
            {block.text}
          </blockquote>
          {block.cite && (
            <figcaption className="mt-2 text-sm text-muted-foreground">
              — {block.cite}
            </figcaption>
          )}
        </figure>
      );

    case 'source':
      return (
        <p className="text-xs leading-relaxed text-muted-foreground">
          <span className="font-semibold">Source: </span>
          {block.text}
        </p>
      );

    case 'callout':
      return (
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-5 dark:border-blue-300/20 dark:bg-blue-300/5">
          {block.title && (
            <p className="mb-1 font-semibold text-primary dark:text-blue-300">
              {block.title}
            </p>
          )}
          <p className="leading-relaxed">{block.text}</p>
        </div>
      );

    case 'table':
      return (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-muted/60">
              <tr>
                {block.head.map((heading) => (
                  <th key={heading} className="px-4 py-3 font-semibold">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-t align-top">
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={
                        cellIndex === 0
                          ? 'px-4 py-3 font-medium'
                          : 'px-4 py-3 text-foreground/80'
                      }
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'steps':
      return (
        <ol className="list-none space-y-4">
          {block.items.map((step, index) => (
            <li key={step.title} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {index + 1}
              </span>
              <div>
                <p className="font-semibold">{step.title}</p>
                <p className="leading-relaxed text-foreground/80">
                  {step.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      );
  }
}

function Section({ section, level }: { section: DocSection; level: 2 | 3 }) {
  const Heading = level === 2 ? 'h2' : 'h3';
  return (
    <section id={section.id} className="scroll-mt-24 space-y-5">
      <Heading
        className={
          level === 2
            ? 'text-2xl font-bold tracking-tight md:text-3xl'
            : 'text-xl font-semibold'
        }
      >
        {section.title}
      </Heading>
      {section.blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
      {section.subsections?.map((sub) => (
        <Section key={sub.id} section={sub} level={3} />
      ))}
    </section>
  );
}

/** Document sections with a sticky "On this page" menu on large screens. */
export function DocumentBody({ sections }: { sections: DocSection[] }) {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
      <nav
        aria-label="On this page"
        className="hidden lg:block lg:sticky lg:top-24 lg:self-start"
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          On this page
        </p>
        <ul className="list-none space-y-2 border-l text-sm">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="-ml-px block border-l border-transparent pl-3 text-muted-foreground hover:border-foreground hover:text-foreground"
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="min-w-0 max-w-3xl space-y-14">
        {sections.map((section) => (
          <Section key={section.id} section={section} level={2} />
        ))}
      </div>
    </div>
  );
}
