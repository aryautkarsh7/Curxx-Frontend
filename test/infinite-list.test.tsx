import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import InfiniteList, { withPage } from '../src/components/listing/InfiniteList';

const list = (page: number, pages: number) =>
  renderToStaticMarkup(
    <InfiniteList
      initial={['Dr. A', 'Dr. B']}
      page={page}
      pages={pages}
      noun="doctors"
      load={async () => []}
      render={(items) => items.map((x) => <p key={x}>{x}</p>)}
      pageHref={(n) => withPage('/mumbai/dentist', 'sort=fee', n)}
    />,
  );

describe('infinite scroll stays crawlable', () => {
  it('the server-rendered page has its items and a real link to the next page', () => {
    const html = list(1, 3);
    expect(html).toContain('<p>Dr. A</p>');
    expect(html).toContain('href="/mumbai/dentist?sort=fee&amp;page=2" rel="next"');
    expect(html).not.toContain('rel="prev"');
  });

  it('later pages link back; the last page has no next link', () => {
    const html = list(3, 3);
    expect(html).toContain('href="/mumbai/dentist?sort=fee&amp;page=2" rel="prev"');
    expect(html).not.toContain('rel="next"');
  });

  it('page 1 has no ?page parameter', () => {
    expect(withPage('/mumbai/hospitals', 'page=4&area=Andheri', 1)).toBe(
      '/mumbai/hospitals?area=Andheri',
    );
  });
});
