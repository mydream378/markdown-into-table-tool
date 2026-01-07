import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import html2canvas from 'html2canvas';
import { Download, ZoomIn, ZoomOut, Type, Palette, Layout, Settings2, Moon, Sun, RotateCcw, Loader2 } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

// Preset color schemes
const PRESETS = [
  {
    name: 'Classic Blue',
    headerBg: '#2563eb',
    headerText: '#ffffff',
    oddRow: '#ffffff',
    evenRow: '#f1f5f9',
    textColor: '#1e293b'
  },
  {
    name: 'Elegant Dark',
    headerBg: '#1e293b',
    headerText: '#ffffff',
    oddRow: '#334155',
    evenRow: '#475569',
    textColor: '#f8fafc'
  },
  {
    name: 'Nature Green',
    headerBg: '#059669',
    headerText: '#ffffff',
    oddRow: '#ffffff',
    evenRow: '#ecfdf5',
    textColor: '#064e3b'
  },
  {
    name: 'Minimal Gray',
    headerBg: '#4b5563',
    headerText: '#ffffff',
    oddRow: '#ffffff',
    evenRow: '#f3f4f6',
    textColor: '#111827'
  }
];

const DEFAULT_MARKDOWN = `
| Rank | Framework | Stars | Satisfaction |
|:---|:---|:---:|:---:|
| 1 | React | 200k+ | 85% |
| 2 | Vue.js | 200k+ | 82% |
| 3 | Svelte | 60k+ | 90% |
| 4 | Angular | 80k+ | 65% |
| 5 | Solid | 25k+ | 88% |

*Data is for demonstration purposes only.*
`;

const STORAGE_KEYS = {
  MARKDOWN: 'table-tool-markdown',
  CONFIG: 'table-tool-config'
};

export default function MarkdownTableTool() {
  const { isDark, toggleTheme } = useTheme();
  
  // State initialization with Lazy Loading from LocalStorage
  const [markdown, setMarkdown] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.MARKDOWN) || DEFAULT_MARKDOWN;
  });

  const [config, setConfig] = useState(() => {
    const savedConfig = localStorage.getItem(STORAGE_KEYS.CONFIG);
    if (savedConfig) {
      return JSON.parse(savedConfig);
    }
    return {
      fontSize: 16,
      scale: 1,
      headerBg: PRESETS[0].headerBg,
      headerText: PRESETS[0].headerText,
      oddRow: PRESETS[0].oddRow,
      evenRow: PRESETS[0].evenRow,
      textColor: PRESETS[0].textColor,
    };
  });

  const [showSettings, setShowSettings] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MARKDOWN, markdown);
  }, [markdown]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
  }, [config]);

  const handleExport = async () => {
    if (previewRef.current && !isExporting) {
      setIsExporting(true);
      // Find the actual table container to export
      const element = previewRef.current.querySelector('.markdown-preview-content') as HTMLElement;
      if (!element) {
        setIsExporting(false);
        return;
      }

      try {
        // Short delay to allow UI to update
        await new Promise(resolve => setTimeout(resolve, 100));

        const canvas = await html2canvas(element, {
          scale: 2, // Higher resolution
          backgroundColor: null, // Transparent background if possible
          useCORS: true,
          logging: false,
        });
        
        const link = document.createElement('a');
        link.download = `markdown-table-${new Date().getTime()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      } catch (err) {
        console.error('Export failed:', err);
        alert('Failed to export image. Please try again.');
      } finally {
        setIsExporting(false);
      }
    }
  };

  const applyPreset = (preset: typeof PRESETS[0]) => {
    setConfig(prev => ({
      ...prev,
      headerBg: preset.headerBg,
      headerText: preset.headerText,
      oddRow: preset.oddRow,
      evenRow: preset.evenRow,
      textColor: preset.textColor,
    }));
  };

  const handleReset = () => {
    if (confirm('Reset all settings and content to default?')) {
      setMarkdown(DEFAULT_MARKDOWN);
      applyPreset(PRESETS[0]);
      setConfig(prev => ({ ...prev, fontSize: 16, scale: 1 }));
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900 flex flex-col lg:flex-row transition-colors duration-200">
      {/* Settings Panel */}
      <div className={`fixed inset-y-0 right-0 w-80 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 z-50 lg:relative lg:translate-x-0 lg:w-80 lg:shadow-none border-l border-gray-200 dark:border-gray-700 overflow-y-auto ${showSettings ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 space-y-8">
          <div className="flex justify-between items-center lg:hidden">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Settings</h2>
            <button onClick={() => setShowSettings(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">✕</button>
          </div>

          {/* Presets */}
          <div>
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Palette size={14} /> Presets
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => applyPreset(preset)}
                  className="px-3 py-2 text-sm rounded-md border border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors text-left"
                >
                  <div className="flex gap-1 mb-1">
                    <div className="w-4 h-4 rounded-full border border-gray-300" style={{ background: preset.headerBg }}></div>
                    <div className="w-4 h-4 rounded-full border border-gray-300" style={{ background: preset.evenRow }}></div>
                  </div>
                  <span className="text-gray-700 dark:text-gray-200">{preset.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div>
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Type size={14} /> Typography
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-300 block mb-1">Font Size: {config.fontSize}px</label>
                <input
                  type="range"
                  min="12"
                  max="24"
                  value={config.fontSize}
                  onChange={(e) => setConfig({ ...config, fontSize: Number(e.target.value) })}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </div>
          </div>

          {/* Scale */}
          <div>
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <ZoomIn size={14} /> Scale
            </h3>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-300 block mb-1">Zoom: {Math.round(config.scale * 100)}%</label>
              <input
                type="range"
                min="0.5"
                max="1.5"
                step="0.1"
                value={config.scale}
                onChange={(e) => setConfig({ ...config, scale: Number(e.target.value) })}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>

          {/* Custom Colors */}
          <div>
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Settings2 size={14} /> Custom Colors
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Header Background', key: 'headerBg' },
                { label: 'Header Text', key: 'headerText' },
                { label: 'Odd Row (Zebra)', key: 'oddRow' },
                { label: 'Even Row', key: 'evenRow' },
                { label: 'Text Color', key: 'textColor' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">{item.label}</span>
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200 dark:border-gray-600">
                    <input
                      type="color"
                      value={config[item.key as keyof typeof config] as string}
                      onChange={(e) => setConfig({ ...config, [item.key]: e.target.value })}
                      className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] cursor-pointer p-0 border-0"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
           {/* Actions */}
           <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
             <button 
               onClick={handleReset}
               className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
             >
               <RotateCcw size={16} /> Reset to Defaults
             </button>
           </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Toolbar */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex justify-between items-center shadow-sm z-10 transition-colors">
          <h1 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <Layout className="text-blue-600 dark:text-blue-400" /> 
            <span className="hidden sm:inline">Table Designer</span>
          </h1>
          <div className="flex gap-2 items-center">
             <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              title="Toggle Dark Mode"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
             <button
              onClick={() => setShowSettings(!showSettings)}
              className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
            >
              <Settings2 size={20} />
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors shadow-sm text-white ${
                isExporting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isExporting ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
              <span className="hidden sm:inline">{isExporting ? 'Exporting...' : 'Export PNG'}</span>
            </button>
          </div>
        </div>

        {/* Editor & Preview */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Editor */}
          <div className="w-full md:w-1/3 lg:w-1/4 border-r border-gray-200 dark:border-gray-700 flex flex-col bg-white dark:bg-gray-800 transition-colors">
            <div className="p-2 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase flex justify-between items-center">
              <span>Markdown Input</span>
              <span className="text-[10px] text-gray-400">Auto-saves</span>
            </div>
            <textarea
              className="flex-1 w-full p-4 resize-none focus:outline-none font-mono text-sm leading-relaxed bg-transparent text-gray-800 dark:text-gray-200"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="Enter your Markdown table here..."
            />
          </div>

          {/* Preview */}
          <div className="flex-1 bg-gray-100 dark:bg-gray-950 overflow-auto p-4 md:p-8 flex items-center justify-center relative transition-colors">
            <div 
              ref={previewRef}
              className="shadow-2xl rounded-lg overflow-hidden bg-white transition-all duration-300"
              style={{
                transform: `scale(${config.scale})`,
                transformOrigin: 'center top'
              }}
            >
              <div 
                className="markdown-preview-content p-8 min-w-[300px]"
                style={{
                  '--header-bg': config.headerBg,
                  '--header-text': config.headerText,
                  '--odd-row': config.oddRow,
                  '--even-row': config.evenRow,
                  '--text-color': config.textColor,
                  '--font-size': `${config.fontSize}px`,
                } as React.CSSProperties}
              >
                <style>{`
                  .markdown-preview-content table {
                    width: 100%;
                    border-collapse: collapse;
                    font-family: 'Noto Sans SC', 'Noto Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
                    font-size: var(--font-size);
                    color: var(--text-color);
                    border-radius: 8px;
                    overflow: hidden;
                  }
                  .markdown-preview-content th {
                    background-color: var(--header-bg);
                    color: var(--header-text);
                    padding: 12px 16px;
                    text-align: left;
                    font-weight: 600;
                  }
                  .markdown-preview-content td {
                    padding: 12px 16px;
                    border-bottom: 1px solid rgba(0,0,0,0.05);
                  }
                  .markdown-preview-content tr:nth-child(odd) {
                    background-color: var(--odd-row);
                  }
                  .markdown-preview-content tr:nth-child(even) {
                    background-color: var(--even-row);
                  }
                  /* Markdown general styles reset for table view */
                  .markdown-preview-content p { margin: 0; }
                `}</style>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {markdown}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
