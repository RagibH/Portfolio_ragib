"use client";



import { useRef } from "react";

import Link from "next/link";

import {

  FaGithub,

  FaLinkedin,

  FaGoogleScholar,

  FaEnvelope,

  FaFacebook,

} from "react-icons/fa6";

import { useScrollReveal } from "@/hooks/useScrollReveal";

import { fadeIn, staggerFromSides } from "@/lib/animations";

import { footerSocialLinks } from "@/lib/site";



const navLinks = [

  { label: "Home", href: "/" },

  { label: "Research", href: "/research" },

  { label: "Projects", href: "/projects" },

  { label: "Experience", href: "/experience" },

  { label: "Contact", href: "/contact" },

];



const socialIcons = {

  GitHub: FaGithub,

  LinkedIn: FaLinkedin,

  Facebook: FaFacebook,

  "Google Scholar": FaGoogleScholar,

  Email: FaEnvelope,

} as const;



export default function Footer() {

  const footerRef = useRef<HTMLElement>(null);

  const gridRef = useRef<HTMLDivElement>(null);

  const bottomRef = useRef<HTMLDivElement>(null);

  const year = new Date().getFullYear();



  useScrollReveal(footerRef, (tl) => {

    if (gridRef.current) {

      tl.add(
        staggerFromSides(gridRef.current.children, {
          stagger: 0.1,
          duration: 0.75,
        })
      );

    }

    if (bottomRef.current) {

      tl.add(fadeIn(bottomRef.current, { duration: 0.55 }), "-=0.25");

    }

  });



  return (

    <footer ref={footerRef} className="site-footer">

      <div className="site-container">

        <div ref={gridRef} className="site-footer__grid">

          <div className="site-footer__column site-footer__brand">

            <p className="site-footer__name">Md. Ragib Hasan</p>

            <p className="site-footer__intro">

              Computer Science Graduate

              <br />

              Aspiring PhD Student

            </p>

            <div className="site-footer__social">

              {footerSocialLinks.map(({ label, href }) => {

                const Icon = socialIcons[label as keyof typeof socialIcons];



                return (

                  <a

                    key={label}

                    href={href}

                    className="site-footer__social-link"

                    aria-label={label}

                    {...(href.startsWith("mailto:")

                      ? undefined

                      : { target: "_blank", rel: "noopener noreferrer" })}

                  >

                    <Icon aria-hidden="true" />

                  </a>

                );

              })}

            </div>

          </div>



          <nav

            className="site-footer__column site-footer__nav"

            aria-label="Footer navigation"

          >

            <p className="site-footer__heading">Navigation</p>

            <ul className="site-footer__list">

              {navLinks.map((link) => (

                <li key={link.href}>

                  <Link href={link.href} className="site-footer__link">

                    {link.label}

                  </Link>

                </li>

              ))}

            </ul>

          </nav>



          <div className="site-footer__column site-footer__links">

            <p className="site-footer__heading">Links</p>

            <ul className="site-footer__list">

              {footerSocialLinks.map((link) => (

                <li key={link.label}>

                  <a

                    href={link.href}

                    className="site-footer__link"

                    {...(link.href.startsWith("mailto:")

                      ? undefined

                      : { target: "_blank", rel: "noopener noreferrer" })}

                  >

                    {link.label}

                  </a>

                </li>

              ))}

            </ul>

          </div>

        </div>



        <div ref={bottomRef} className="site-footer__bottom">

          <p className="site-footer__credit">

            Crafted with care by Md. Ragib Hasan. &copy; {year}

          </p>

        </div>

      </div>

    </footer>

  );

}

