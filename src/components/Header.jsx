import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState("EN");
  const navigate = useNavigate();

  const location = useLocation();

  // Load current language from server
  useEffect(() => {
    console.log("Loading language from server...");
    fetch('/api/get-language', { 
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        console.log("Language API response status:", res.status);
        return res.json();
      })
      .then(data => {
        console.log("Language data received:", data);
        if (data.language) {
          setLanguage(data.language.toUpperCase());
        }
      })
      .catch(err => {
        console.log("Could not load language preference:", err);
        setLanguage("EN"); // Default fallback
      });
  }, []);

  const handleLanguageChange = async (lang) => {
    try {
      console.log("Changing language to:", lang);
      const response = await fetch(`/api/set-language/${lang.toLowerCase()}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      console.log("Language change response status:", response.status);
      const data = await response.json();
      console.log("Language change response data:", data);
      
      if (response.ok && data.status === 'success') {
        setLanguage(lang);
        console.log("Language successfully changed to:", lang);
        // Small delay before reload to ensure session is saved
        setTimeout(() => {
          window.location.reload();
        }, 100);
      } else {
        console.error("Failed to change language:", data);
      }
    } catch (error) {
      console.error("Error changing language:", error);
    }
  };

  const navigation = [
    { name: "News", href: "/news" },
    { name: "Markets", href: "/markets" },
    { name: "Terminal", href: "/terminal" },
    { name: "Education", href: "/education" },
    { name: "AI Assistant", href: "/ai" },
    { name: "Auction", href: "/auction" },
    { name: "VPN", href: "/vpn" },
  ];

  return (
    <header
      id="header"
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-[var(--glass-border)]"
      style={{ height: "var(--header-h)" }}
    >
      <div className="container-custom flex items-center justify-between h-full">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-8 h-8 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-lg flex items-center justify-center text-lg font-bold animate-glow">
            🚀
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
            BarzinCrypto
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-[var(--accent-primary)] ${
                location.pathname === item.href
                  ? "text-[var(--accent-primary)]"
                  : "text-[var(--text-secondary)]"
              }`}
            >
              {item.name}
              {location.pathname === item.href && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Language Switcher & Actions */}
        <div className="flex items-center space-x-4">
          {/* Language Switcher */}
          <div className="hidden sm:flex items-center space-x-1 glass-intense rounded-lg p-1">
            <button
              onClick={() => handleLanguageChange("EN")}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                language === "EN"
                  ? "bg-[var(--accent-primary)] text-black"
                  : "text-[var(--text-secondary)] hover:text-white"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => handleLanguageChange("FA")}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                language === "FA"
                  ? "bg-[var(--accent-primary)] text-black"
                  : "text-[var(--text-secondary)] hover:text-white"
              }`}
            >
              FA
            </button>
          </div>

          {/* Balance */}
          <div className="hidden sm:flex items-center space-x-2 glass-intense rounded-lg px-3 py-2">
            <span className="text-xs text-[var(--text-secondary)]">
              Balance:
            </span>
            <span className="text-sm font-mono font-semibold text-[var(--accent-primary)]">
              $12,847.23
            </span>
          </div>

          {/* Auth Buttons */}
          <div className="hidden sm:flex items-center space-x-2">
            <button 
              onClick={() => navigate('/auth/signin')}
              className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-white transition-all"
            >
              Sign In
            </button>
            <button 
              onClick={() => navigate('/auth/signup')}
              className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-black rounded-lg hover:shadow-lg hover:shadow-[var(--accent-primary)]/25 transition-all"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[var(--text-secondary)] hover:text-white transition-all"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-intense border-t border-[var(--glass-border)]">
          <div className="px-4 py-2 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                  location.pathname === item.href
                    ? "bg-[var(--accent-primary)] text-black"
                    : "text-[var(--text-secondary)] hover:text-white hover:bg-white/5"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Actions */}
            <div className="pt-4 pb-2 border-t border-[var(--glass-border)] mt-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-[var(--text-secondary)]">
                  Balance:
                </span>
                <span className="text-sm font-mono font-semibold text-[var(--accent-primary)]">
                  $000
                </span>
              </div>

              <div className="flex space-x-2">
                <button 
                  onClick={() => {
                    navigate('/auth/signin')
                    setIsMobileMenuOpen(false)
                  }}
                  className="flex-1 px-3 py-2 text-sm font-medium text-[var(--text-secondary)] border border-[var(--glass-border)] rounded-lg hover:text-white transition-all"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => {
                    navigate('/auth/signup')
                    setIsMobileMenuOpen(false)
                  }}
                  className="flex-1 px-3 py-2 text-sm font-medium bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-black rounded-lg transition-all"
                >
                  Get Started
                </button>
              </div>

              <div className="flex items-center justify-center space-x-1 mt-3 glass-intense rounded-lg p-1">
                <button
                  onClick={() => handleLanguageChange("EN")}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                    language === "EN"
                      ? "bg-[var(--accent-primary)] text-black"
                      : "text-[var(--text-secondary)] hover:text-white"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => handleLanguageChange("FA")}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                    language === "FA"
                      ? "bg-[var(--accent-primary)] text-black"
                      : "text-[var(--text-secondary)] hover:text-white"
                  }`}
                >
                  فا
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
