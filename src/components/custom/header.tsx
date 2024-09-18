import LiceoMilitarEscudoCEC from "@/assets/images/cec-liceo-militar-escudo.png";
import BuffetCEC from "@/assets/images/buffet-blur-background.png";

function Header() {
  return (
    <header className="pt-4 bg-cec_primaryDarker">
      <img
        src={LiceoMilitarEscudoCEC}
        alt="Liceo Militar General San Martín"
        className="max-w-48 w-full mb-4 mx-5"
      />

      <img src={BuffetCEC} alt="" className="w-full max-h-36 object-cover" />
    </header>
  );
}

export default Header;
