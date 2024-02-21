import { BiLogoGithub, BiLogoLinkedin, BiLink } from "react-icons/bi";

export default function ExternalLinks() {
  return (
    <div className="flex gap-5 items-center flex-wrap text-2xl mt-5">
      <a
        href="https://linkedin.com/in/oktaycolakoglu"
        target="_blank"
        rel="noreferrer noopener"
      >
        <BiLogoLinkedin />
        <span className="sr-only">Linkedin</span>
      </a>
      <a
        href="https://github.com/oktay/movies"
        target="_blank"
        rel="noreferrer noopener"
      >
        <BiLogoGithub />
        <span className="sr-only">Github</span>
      </a>
      <a
        href="https://oktaycolakoglu.com"
        target="_blank"
        rel="noreferrer noopener"
      >
        <BiLink />
        <span className="sr-only">Personal Website</span>
      </a>
    </div>
  );
}
