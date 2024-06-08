import LiceoMilitarEscudoCEC from "@/assets/images/cec-liceo-militar-escudo.png"

function Header() {
  return (<header className="py-4 px-5 bg-cec_primaryDarker">
    <img src={LiceoMilitarEscudoCEC} alt="Liceo Militar General San Martín" className="max-w-48 w-full" />
  </header>)
}

export default Header