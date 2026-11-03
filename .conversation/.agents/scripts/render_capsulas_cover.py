import fitz
pdf = fitz.open('attached_assets/Capsulas-Portada-PRINT_1793726296364.pdf')
page = pdf[0]
pix = page.get_pixmap(matrix=fitz.Matrix(1.5, 1.5), alpha=False)
pix.save('.agents/outputs/capsulas-cover-preview.png')
print(f'pages={len(pdf)} page_size={page.rect.width:.0f}x{page.rect.height:.0f} rendered={pix.width}x{pix.height}')
