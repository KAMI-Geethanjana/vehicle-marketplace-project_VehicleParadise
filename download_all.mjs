import fs from 'fs';
import path from 'path';

const urls = [
  'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1558980663-3685c1d673c4?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&w=600&q=80'
];

const targetDir = './verify_imgs';
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir);

for (let i = 0; i < urls.length; i++) {
  try {
    const res = await fetch(urls[i]);
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(path.join(targetDir, `img_${i}.jpg`), buffer);
    console.log(`Downloaded img_${i}.jpg (${buffer.length} bytes)`);
  } catch (err) {
    console.error(`Failed ${i}:`, err.message);
  }
}
