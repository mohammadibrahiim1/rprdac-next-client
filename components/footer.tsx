import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-linear-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">SGS</span>
              </div>
              <div>
                <div className="font-bold">Saint Gebriale School</div>
                <div className="text-sm text-amber-400">
                  Excellence in Education
                </div>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Shaping character, nurturing brilliance, and building
              tomorrow&apos;s leaders with purpose, discipline, and grace.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-amber-400 cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-amber-400 cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-amber-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link
                href="/about"
                className="block text-gray-300 hover:text-amber-400 transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/programs"
                className="block text-gray-300 hover:text-amber-400 transition-colors"
              >
                Programs
              </Link>
              <Link
                href="/admissions"
                className="block text-gray-300 hover:text-amber-400 transition-colors"
              >
                Admissions
              </Link>
              <Link
                href="/academics"
                className="block text-gray-300 hover:text-amber-400 transition-colors"
              >
                Academics
              </Link>
              <Link
                href="/contact"
                className="block text-gray-300 hover:text-amber-400 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-bold text-lg mb-4">Programs</h3>
            <div className="space-y-2">
              <Link
                href="/programs#kindergarten"
                className="block text-gray-300 hover:text-amber-400 transition-colors"
              >
                Kindergarten
              </Link>
              <Link
                href="/programs#primary"
                className="block text-gray-300 hover:text-amber-400 transition-colors"
              >
                Primary School
              </Link>
              <Link
                href="/programs#middle"
                className="block text-gray-300 hover:text-amber-400 transition-colors"
              >
                Middle School
              </Link>
              <Link
                href="/programs#high"
                className="block text-gray-300 hover:text-amber-400 transition-colors"
              >
                High School
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-amber-400" />
                <span className="text-gray-300 text-sm">Pissa</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-amber-400" />
                <span className="text-gray-300 text-sm">+251 123 456 78</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-amber-400" />
                <span className="text-gray-300 text-sm">
                  info@saintgebrialeschool.edu
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Saint Gebriale School. All rights reserved. | Building
            tomorrow&apos;s leaders with purpose and grace.
          </p>
        </div>
      </div>
    </footer>
  );
}
