import React from 'react';
import { ExternalLink } from 'lucide-react';
import publicationsData from '../data/publications.json';
import { Publication } from '@/types';

const toInitials = (given: string) => {
  const parts = (given || '').split(/[\s-]+/).filter(Boolean);
  return parts.map(p => `${p[0].toUpperCase()}.`).join(' ');
};

const sentenceCase = (s: string) => {
  if (!s) return s;
  const lower = s.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
};

const isMengfeiCai = (family?: string, given?: string, raw?: string) => {
  const fam = (family || '').trim().toLowerCase();
  const giv = (given || '').trim().toLowerCase();
  const r = (raw || '').toLowerCase();
  if (fam === 'cai' && (giv.startsWith('m') || giv.includes('mengfei'))) return true;
  if (r.includes('mengfei cai')) return true;
  if (r.match(/\bm\.?\s*cai\b/)) return true;
  return false;
};

const formatAuthorsAPA = (pub: Publication) => {
  const list: Array<{ family: string; given: string; raw?: string }> =
    pub.authorsFull?.map(a => ({ family: a.family || '', given: a.given || '' })) ||
    (pub.authors || []).map(a => {
      const t = a.trim();
      if (t.includes(',')) {
        const [family, given] = t.split(',').map(x => x.trim());
        return { family: family || '', given: given || '', raw: a };
      }
      const parts = t.split(' ');
      if (parts.length >= 2) {
        const last = parts[parts.length - 1];
        const first = parts.slice(0, -1).join(' ');
        const looksLikeInitialsFirst = /^[A-Z]+$/i.test(first.replace(/\./g, ''));
        if (looksLikeInitialsFirst) return { family: last, given: first.replace(/\./g, ' ') };
        return { family: last, given: first };
      }
      return { family: t, given: '' };
    });

  const max = 20;
  let formatted: string[] = [];
  if (list.length <= max) {
    formatted = list.map(a => `${a.family}, ${toInitials(a.given)}`.trim());
  } else {
    const first = list.slice(0, 19).map(a => `${a.family}, ${toInitials(a.given)}`.trim());
    const last = `${list[list.length - 1].family}, ${toInitials(list[list.length - 1].given)}`.trim();
    formatted = [...first, '…', last];
  }

  return (
    <span>
      {formatted.map((txt, i) => {
        const a = list[Math.min(i, list.length - 1)];
        const highlight = isMengfeiCai(a?.family, a?.given, pub.authors?.[i]);
        const sep = i < formatted.length - 1 ? (i === formatted.length - 2 ? ' & ' : ', ') : '';
        return (
          <span key={i} className={highlight ? 'underline' : undefined}>
            {txt}
            {sep}
          </span>
        );
      })}
    </span>
  );
};

const PublicationsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Publications</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Peer-reviewed research contributions to the field of neuroimaging and computational neuroscience
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
        </div>
        
        <div className="space-y-6">
          {[...publicationsData]
            .sort((a: any, b: any) => (b.year || 0) - (a.year || 0))
            .map((publication: any) => (
            <div key={publication.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                  <div className="text-gray-900 text-base leading-7">
                    {formatAuthorsAPA(publication as Publication)} {` `}
                    <span>({publication.year || 'n.d.'}). </span>
                    <span>{sentenceCase(publication.title)}. </span>
                    <i>{publication.journal}</i>
                    {publication.volume && <span> <i>{publication.volume}</i></span>}
                    {publication.issue && <span>({publication.issue})</span>}
                    {publication.pages && <span>, {publication.pages}</span>}
                    {publication.doi && (
                      <span> <a className="text-blue-600 hover:underline" target="_blank" rel="noreferrer" href={`https://doi.org/${publication.doi}`}>https://doi.org/{publication.doi}</a></span>
                    )}
                  </div>
                </div>
                
                <div className="lg:ml-6 mt-4 lg:mt-0">
                  <div className="flex flex-col space-y-2">
                    <a
                      href={publication.pubmedUrl || (publication.doi ? `https://doi.org/${publication.doi}` : publication.pdfUrl || '#')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Open</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-800 px-6 py-3 rounded-lg">
            <span>📚</span>
            <span>Total Publications: {publicationsData.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicationsPage;
