const { createClient } = require('@sanity/client');
const fs = require('fs');

// Manual env loader MUST come first
if (fs.existsSync('.env.local')) {
  const envFile = fs.readFileSync('.env.local', 'utf8');
  envFile.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) process.env[key.trim()] = value.trim();
  });
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
  apiVersion: '2024-03-24',
});

async function syncProject() {
  try {
    const templateData = JSON.parse(fs.readFileSync('global-city-template.json', 'utf8'));
    const slug = templateData.slug.current;

    // Fetch existing project to get image IDs
    const existingProject = await client.fetch('*[_type == "project" && slug.current == $slug][0]', { slug });

    if (!existingProject) {
      console.error('Project not found, cannot sync images safely. Please create manually or provide valid IDs.');
      return;
    }

    const mainImageRef = existingProject.mainImage?.asset?._ref;
    
    // Update template with existing images
    if (mainImageRef) {
      templateData.mainImage = {
        _type: 'image',
        asset: { _type: 'reference', _ref: mainImageRef }
      };
    }

    // Sync top-level gallery and 3D View
    if (existingProject.gallery) {
      templateData.gallery = existingProject.gallery;
    } else if (templateData.gallery) {
      // Remove placeholder images if no existing gallery
      templateData.gallery.images = (templateData.gallery.images || []).filter(img => 
        img.asset?._ref && !img.asset._ref.includes('0g0g0') && !img.asset._ref.includes('0h0h0')
      );
    }

    if (existingProject.project3DView) {
      templateData.project3DView = existingProject.project3DView;
    }

    templateData.content = templateData.content.map(block => {
      if (block._type === 'hero' && existingProject.mainImage) {
          block.backgroundImage = existingProject.mainImage;
          block.heading = templateData.title; 
      } else if (block._type === 'hero' && block.backgroundImage?.asset?._ref?.includes('0f0f0')) {
          // Remove placeholder hero image
          delete block.backgroundImage;
      }

      if (block._type === 'gallery') {
          const existingGallery = (existingProject.content || []).find(b => b._type === 'gallery');
          
          // If template has specific images with URLs (local assets), use them
          const hasTemplateImages = block.images && block.images.some(img => img.url);

          if (existingGallery && !hasTemplateImages) {
              block.images = existingGallery.images;
              block.heading = existingGallery.heading || block.heading;
              block.description = existingGallery.description || block.description;
          } else if (!existingGallery) {
              // Remove placeholder images ONLY if we don't have new template images
              block.images = (block.images || []).filter(img => 
                (img.url) || (img.asset?._ref && !img.asset._ref.includes('0g0g0') && !img.asset._ref.includes('0h0h0'))
              );
          }
          // If hasTemplateImages, we keep the template's block.images as is
      }
      if (block._type === 'project3DView') {
          const existing3D = existingProject.content?.find(b => b._type === 'project3DView');
          if (existing3D) {
              block.title = existing3D.title || block.title;
              block.subtitle = existing3D.subtitle || block.subtitle;
              block.views = existing3D.views || block.views;
          }
      }
      return block;
    });

    console.log(`Updating existing project with ID: ${existingProject._id}`);
    
    const updateData = { ...templateData };
    delete updateData._id;
    delete updateData._type; 

    await client.patch(existingProject._id).set(updateData).commit();
    console.log('Sync completed successfully!');
  } catch (err) {
    console.error('Error syncing project:', err.message);
  }
}

syncProject();
