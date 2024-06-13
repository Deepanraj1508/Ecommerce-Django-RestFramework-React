# email_utils.py
import logging
from django.core.mail import send_mail
from django.conf import settings
from datetime import datetime

logger = logging.getLogger(__name__)


# Regitration Page
def send_registration_email(name, email):
    website_name = 'EcomGrove'
    registration_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    support_email = 'support@ecomgrove.com'  # replace with actual support email
    support_phone = '+1-800-123-4567'  # replace with actual support phone number

    email_subject = f"Registration Successful! Welcome to {website_name}"
    email_body = f"""
    Dear {name},

    Thank you for registering with {website_name}! We are thrilled to welcome you to our shopping community.

    Your registration form has been successfully submitted, and your account is now active.

    Here are the details you provided:

    Full Name: {name}
    Email Address: {email}
    Registration Date: {registration_date}

    What to Expect Next:

    - Explore Our Catalog: Browse through our extensive range of products and find what you love.
    - Exclusive Offers: Stay tuned for special discounts and offers available only to our registered members.
    - Easy Checkout: Enjoy a seamless and secure checkout experience with multiple payment options.
    - Order Tracking: Keep track of your orders and get real-time updates on your shipments.

    To get you started, here’s a special welcome gift: Use code WELCOME10 for 10% off your first purchase!

    If you have any questions or need assistance, our customer support team is here to help. Contact us at {support_email} or {support_phone}.

    Thank you for choosing {website_name}. We look forward to serving you!

    Happy Shopping!

    Best regards,

    {website_name},
    Karur,
    Tamilnadu.
    """

    try:
        # Send automatic response to the user
        send_mail(
            subject=email_subject,
            message=email_body,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[email],
            fail_silently=False,
        )
    except Exception as e:
        logger.error(f"Error sending email: {e}")



# Contact Page
def send_contact_message(name, email, message):
    try:
        # Send email to predefined email address
        send_mail(
            subject=f"New Contact Message from {name}",
            message=f"Name: {name}\nEmail: {email}\nMessage: {message}",
            from_email=email,
            recipient_list=[settings.EMAIL_HOST_USER],
            fail_silently=False,
        )

        # Send automatic response to the user
        send_mail(
            subject="Thank you for contacting us",
            message=f"Dear {name},\n\nThank you for reaching out to us. We have received your message and will get back to you shortly.\n\nBest regards,\nShopHub.Pvt.Ltd,\nKarur,\nTamilNadu.",
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[email],
            fail_silently=False,
        )

    except Exception as e:
        logger.error(f"Error sending email: {e}")
        raise
