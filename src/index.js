const fileSystem = require('fs');

const { getClientAllProjects } = require("./services/services");
const { dynamic_paths, static_paths } = require('./utils/constants')

const PAGE_URL = process.env.PAGE_URL
const date = new Date();

async function generateSitemap() {
  try {
    const projects = await getClientAllProjects();
    console.log('################', projects)

    const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${PAGE_URL}/</loc>
        <lastmod>${date}</lastmod>
        <priority>0.8</priority>
      </url>
      ${static_paths.map(( path )=> {
          return `
      <url>
        <loc>${PAGE_URL}/${path}</loc>
        <lastmod>${date}</lastmod>
        <priority>0.76</priority>
      </url>
      `
        }).join('')
      }
      ${projects
        .map(({ _id }) => {
          return `
      <url>
        <loc>${`${PAGE_URL}/${dynamic_paths.projects }=${_id}`}</loc>
        <lastmod>${date}</lastmod>
        <priority>0.64</priority>
      </url>
      `;
        })
        .join('')}
    </urlset>
    `

    fileSystem.appendFile('sitemap.xml', sitemap, (err) => {
      if (err) {
        console.log(err)
      }

      console.log('File created successfully ✅: ', sitemap)
    })
  } catch (error) {
    console.log(error)
  }
} 

generateSitemap();
