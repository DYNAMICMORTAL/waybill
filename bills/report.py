from weasyprint import HTML
import flask

from weasyprint import HTML
html = HTML('billTemplate.html')
html.write_pdf('invoice.pdf')