import idiomas from "../assets/idiomas.png";

function BackgroundLoop() {
  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-15">

      <div className="flex w-[200%] animate-scroll">

        {/* IMAGEM DUPLICADA (ESSENCIAL PARA LOOP) */}
        <img src={idiomas} className="w-full h-full object-cover" alt="" />
        <img src={idiomas} className="w-full h-full object-cover" alt="" />

      </div>

    </div>
  );
}

export default BackgroundLoop;