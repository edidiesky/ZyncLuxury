const Expert = () => {
  return (
    <div className="flex w-full flex-col">
      <div
        data-scroll-section
        className="w-full flex relative bg-[#f4f5fa] py-20 flex-col gap-40"
      >
        <div className="background_grey"></div>
        <div className="w-[95%] max-w-custom mx-auto flex flex-col gap-20">
          <div className="grid lg:grid-cols-2 items-start md:items-center w-full gap-8">
            <div className="flex flex-col gap-4">
              <h4 className="text-lg md:text-xl text-[var(--primary)]">
                Passionate – Dedicated – Professional
              </h4>
              <h3 className="text-4xl md:text-5xl family2 text-[var(--dark-1)]">
                Why you should <br /> Choose ZyncLuxury?
              </h3>
              <h4 className="text-lg md:text-2xl text-[var(--dark-1)]">
                Auisque cursus sed magnads vitae conubia pharetra auctor
                interdum dui metus augue.
              </h4>
            </div>
            <div className="flex lg:items-center md:justify-end">
              <div className="flex flex-col gap-3">
                <span className="text-xl text-grey font-normal"></span>
                <div className="w-full h-8 rounded-xl bg-[hsla(232, 28%,calc(73% + 18%), 100%)]">

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expert;
