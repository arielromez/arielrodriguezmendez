from reportlab.lib import colors
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas


def draw_wrapped_text(c, text, x, y, max_width, font_name="Helvetica", font_size=11, line_height=15):
    c.setFont(font_name, font_size)
    words = text.split(" ")
    current = ""

    for word in words:
        test_line = (current + " " + word).strip()
        if c.stringWidth(test_line, font_name, font_size) <= max_width:
            current = test_line
        else:
            c.drawString(x, y, current)
            y -= line_height
            current = word

    if current:
        c.drawString(x, y, current)
        y -= line_height

    return y


def section_title(c, text, x, y):
    c.setFont("Helvetica-Bold", 12)
    c.drawString(x, y, text.upper())
    return y - 18


def write_cv(output_path="files/Ariel-Rodriguez-Mendez-CV.pdf"):
    c = canvas.Canvas(output_path, pagesize=LETTER)
    width, height = LETTER

    # Style controls
    margin_x = 0.9 * inch
    y = height - 0.9 * inch
    body_line_height = 15
    section_gap = 24
    max_width = width - (2 * margin_x)

    # Header
    c.setFont("Helvetica-Bold", 18)
    c.drawString(margin_x, y, "Ariel Rodriguez Mendez")
    y -= 22

    c.setFont("Helvetica", 12)
    c.drawString(margin_x, y, "Graphic Designer")
    y -= 20

    c.setStrokeColor(colors.HexColor("#222222"))
    c.setLineWidth(1)
    c.line(margin_x, y, width - margin_x, y)
    y -= 22

    # Profile
    y = section_title(c, "Profile", margin_x, y)
    profile = (
        "I am a Cuban graphic designer with over a decade of experience in visual communication, "
        "specializing in brand identity, editorial design, environmental graphics, and digital experiences."
    )
    y = draw_wrapped_text(c, profile, margin_x, y, max_width, line_height=body_line_height)
    y -= section_gap

    # Education
    y = section_title(c, "Education", margin_x, y)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(margin_x, y, "Bachelor's Degree in Visual Communication Design")
    y -= body_line_height
    c.setFont("Helvetica", 11)
    c.drawString(margin_x, y, "Higher Institute of Design in Havana | 2009-2014")
    y -= 18

    c.setFont("Helvetica-Bold", 12)
    c.drawString(margin_x, y, "Postgraduate in Color Management in Design")
    y -= body_line_height
    c.setFont("Helvetica", 11)
    c.drawString(margin_x, y, "Higher Institute of Design in Havana | 2014")
    y -= section_gap + 10

    # Work Experience
    y = section_title(c, "Work Experience", margin_x, y)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(margin_x, y, "Art Director, Cine Cubano Magazine")
    y -= body_line_height
    c.setFont("Helvetica", 11)
    c.drawString(margin_x, y, "Cuban Institute of Cinematographic Art and Industry (ICAIC) | 2017-2021")
    y -= 18

    c.setFont("Helvetica-Bold", 12)
    c.drawString(margin_x, y, "Art Director, Bisiesto")
    y -= body_line_height
    c.setFont("Helvetica", 12)
    y = draw_wrapped_text(
        c,
        "Daily journal of The ICAIC Young Filmmakers Festival (Muestra Joven ICAIC) | 2015-2018",
        margin_x,
        y,
        max_width,
        line_height=body_line_height,
    )
    y -= section_gap

    # Core Areas
    y = section_title(c, "Core Areas", margin_x, y)
    c.setFont("Helvetica", 12)
    for item in [
        "Brand Identity",
        "Editorial Design",
        "Illustration",
        "Environmental Graphics",
        "Information Design",
        "UX/UI Design",
        "Frontend Design",
    ]:
        c.drawString(margin_x + 10, y, f"- {item}")
        y -= body_line_height

    y -= section_gap

    # Contact
    y = section_title(c, "Contact", margin_x, y)
    c.setFont("Helvetica", 12)
    c.drawString(margin_x, y, "Email: arielromez.info@gmail.com")
    y -= body_line_height
    c.drawString(margin_x, y, "Portfolio: arielrodriguezmendez.com")

    c.save()


if __name__ == "__main__":
    write_cv()
    print("Generated files/Ariel-Rodriguez-Mendez-CV.pdf")
