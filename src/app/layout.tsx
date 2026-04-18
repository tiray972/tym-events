import type { Metadata } from "next";
import "./globals.css";
import "./legacy.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "TYM EVENTS AGENCY - Agence événementielle",
  description: "Agence d'influence, conseil en relation publiques et communication. Partenariat entre les marques et les personnalité publiques sur les réseaux sociaux",
  generator: "WordPress 6.0",
  icons: {
    icon: [
      { url: "/images/LOGO-TYM-EVENTS-REFLET-300x300.png", type: "image/png" },
      { url: "/images/cropped-LOGO-TYM-EVENTS-REFLET-32x32.png", sizes: "32x32" },
      { url: "/images/cropped-LOGO-TYM-EVENTS-REFLET-192x192.png", sizes: "192x192" },
    ],
    apple: "/images/cropped-LOGO-TYM-EVENTS-REFLET-180x180.png",
  },
  other: {
    "msapplication-TileImage": "https://tym-events.com/wp-content/uploads/2021/11/cropped-LOGO-TYM-EVENTS-REFLET-270x270.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US" className="html_stretched responsive av-preloader-disabled av-default-lightbox html_header_top html_logo_left html_main_nav_header html_menu_right html_slim html_header_sticky html_header_shrinking_disabled html_mobile_menu_phone html_header_searchicon_disabled html_content_align_center html_header_unstick_top_disabled html_header_stretch html_minimal_header html_minimal_header_shadow html_elegant-blog html_modern-blog html_av-overlay-side html_av-overlay-side-classic html_av-submenu-noclone html_entry_id_241 av-cookies-no-cookie-consent av-no-preview html_text_menu_active avia_desktop js_active avia_transform avia_transform3d avia_transform avia_transform3d avia-webkit avia-webkit-147 avia-chrome avia-chrome-147">
      <head>
        <link rel="stylesheet" id="avia-scs-css" href="https://tym-events.com/wp-content/themes/enfold/css/shortcodes.css?ver=4.7.5" type="text/css" media="all" />
        <link rel="stylesheet" id="avia-popup-css-css" href="https://tym-events.com/wp-content/themes/enfold/js/aviapopup/magnific-popup.css?ver=4.7.5" type="text/css" media="screen" />
        <link rel="stylesheet" id="avia-lightbox-css" href="https://tym-events.com/wp-content/themes/enfold/css/avia-snippet-lightbox.css?ver=4.7.5" type="text/css" media="screen" />
        <link rel="stylesheet" id="avia-widget-css-css" href="https://tym-events.com/wp-content/themes/enfold/css/avia-snippet-widget.css?ver=4.7.5" type="text/css" media="screen" />
        <link rel="stylesheet" id="avia-dynamic-css" href="https://tym-events.com/wp-content/uploads/dynamic_avia/enfold.css?ver=61f063864d6b7" type="text/css" media="all" />
        <link rel="stylesheet" id="avia-custom-css" href="https://tym-events.com/wp-content/themes/enfold/css/custom.css?ver=4.7.5" type="text/css" media="all" />
        
        <style type="text/css">{`
          @font-face {
            font-family: 'entypo-fontello';
            font-weight: normal;
            font-style: normal;
            font-display: auto;
            src: url('https://tym-events.com/wp-content/themes/enfold/config-templatebuilder/avia-template-builder/assets/fonts/entypo-fontello.eot');
            src: url('https://tym-events.com/wp-content/themes/enfold/config-templatebuilder/avia-template-builder/assets/fonts/entypo-fontello.eot?#iefix') format('embedded-opentype'),
                url('https://tym-events.com/wp-content/themes/enfold/config-templatebuilder/avia-template-builder/assets/fonts/entypo-fontello.woff') format('woff'),
                url('https://tym-events.com/wp-content/themes/enfold/config-templatebuilder/avia-template-builder/assets/fonts/entypo-fontello.woff2') format('woff2'),
                url('https://tym-events.com/wp-content/themes/enfold/config-templatebuilder/avia-template-builder/assets/fonts/entypo-fontello.ttf') format('truetype'),
                url('https://tym-events.com/wp-content/themes/enfold/config-templatebuilder/avia-template-builder/assets/fonts/entypo-fontello.svg#entypo-fontello') format('svg');
          }

          #top .avia-font-entypo-fontello,
          body .avia-font-entypo-fontello,
          html body [data-av_iconfont='entypo-fontello']:before {
            font-family: 'entypo-fontello';
          }

          .avia-section.av-minimum-height .container {
            opacity: 1;
          }

          .av-minimum-height-100 .container,
          .avia-fullscreen-slider .avia-slideshow,
          #top.avia-blank .av-minimum-height-100 .container,
          .av-cell-min-height-100>.flex_cell {
            height: 707px;
          }
        `}</style>
      </head>
      <body id="top" className="home page-template-default page page-id-241 rtl_columns stretched oswald raspoutine-1-custom raspoutine-1" itemScope itemType="https://schema.org/WebPage">
        {children}
        
        <Script src="https://tym-events.com/wp-includes/js/jquery/jquery.min.js?ver=3.6.0" strategy="beforeInteractive" />
        <Script src="https://tym-events.com/wp-includes/js/jquery/jquery-migrate.min.js?ver=3.3.2" strategy="beforeInteractive" />
        <Script src="https://tym-events.com/wp-content/themes/enfold/js/avia-compat.js?ver=4.7.5" strategy="beforeInteractive" />
        <Script src="https://tym-events.com/wp-content/themes/enfold/js/avia.js?ver=4.7.5" strategy="lazyOnload" />
        <Script src="https://tym-events.com/wp-content/themes/enfold/js/shortcodes.js?ver=4.7.5" strategy="lazyOnload" />
        <Script src="https://tym-events.com/wp-content/themes/enfold/js/aviapopup/jquery.magnific-popup.min.js?ver=4.7.5" strategy="lazyOnload" />
        <Script src="https://tym-events.com/wp-content/themes/enfold/js/avia-snippet-lightbox.js?ver=4.7.5" strategy="lazyOnload" />
        <Script src="https://tym-events.com/wp-content/themes/enfold/js/avia-snippet-widget.js?ver=4.7.5" strategy="lazyOnload" />
      </body>
    </html>
  );
}
