import { FaGithub, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <footer className="bg-dark-blue text-light-gray text-center p-3 border-t border-gray-600 w-full sticky md:relative bottom-0">
      <div className="container mx-auto flex justify-between items-center flex-col sm:flex-row">
        <div className="text-base mb-3 sm:mb-0">
          &copy; {year} Zumber, Inc.
        </div>
        <div className="flex items-center">
          <div className="text-base">
            Hecho con 🤍 por&nbsp;
            <a
              href="https://github.com/IsmaelP19"
              target="_blank"
              rel="noreferrer"
              className="text-gold hover:underline"
            >
              Ismael
            </a>
            &nbsp;y&nbsp;
            <a
              href="https://github.com/migromarj"
              target="_blank"
              rel="noreferrer"
              className="text-gold hover:underline"
            >
              Miguel
            </a>
          </div>
        </div>
        <div className="text-xl flex-row flex mt-3 sm:mt-0">
          <a href="mailto:zumber.contact@gmail.com">
          <FaEnvelope className="mx-4" />
          </a>
          <a
            href="https://github.com/IsmaelP19/Zumber"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub className="mx-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
