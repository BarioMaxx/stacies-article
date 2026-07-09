import { handleUpload } from '@vercel/blob/client';
import { list } from '@vercel/blob';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. CLIENT LOADING STATES: Fetch the latest image paths on page load
  if (req.method === 'GET') {
    try {
      const { blobs } = await list();
      const slots = ['hero', 'left', 'rightTop', 'rightBottom', 'avatar', 'circle1', 'circle2', 'circle3'];
      const currentAssets: Record<string, string> = {};
      
      slots.forEach(slot => {
        // Filter out items matching this structural slot prefix and sort by upload date
        const matches = blobs
          .filter(b => b.pathname.startsWith(`portfolio/${slot}-`))
          .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
        
        if (matches.length > 0) {
          currentAssets[slot] = matches[0].url;
        }
      });
      
      return res.status(200).json(currentAssets);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to synchronize remote assets.' });
    }
  }

  // 2. STACY UPLOAD SIGNATURES: Generate secure transactional client upload tokens
  if (req.method === 'POST') {
    try {
      const jsonResponse = await handleUpload({
        body: req.body,
        request: req,
        onBeforeGenerateToken: async () => {
          return {
            allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
          };
        },
        onUploadCompleted: async ({ blob }) => {
          console.log('Asset successfully mapped and locked in cloud storage:', blob.url);
        },
      });
      return res.status(200).json(jsonResponse);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}