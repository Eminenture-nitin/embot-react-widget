import React from "react";

const SliderTriggerComponent = ({ data }) => {
  return (
    <div
      style={{
        boxShadow: "rgb(182, 190, 252) 0px 0px 13px",
      }}
      className="EMBOT-w-full EMBOT-text-center EMBOT-m-auto EMBOT-block EMBOT-max-w-[18rem] EMBOT-rounded-lg EMBOT-bg-white EMBOT-text-surface EMBOT-shadow-blue-1 dark:EMBOT-bg-surface-dark dark:EMBOT-text-white"
    >
      {data?.slides?.map((item) => (
        <>
          <div className="EMBOT-relative EMBOT-overflow-hidden EMBOT-bg-cover EMBOT-bg-no-repeat">
            <img
              className="EMBOT-rounded-t-lg"
              src="https://tecdn.b-cdn.net/img/new/standard/city/062.jpg"
              alt=""
            />
          </div>
          <div className="EMBOT-p-6">
            <h5 className="EMBOT-mb-2 EMBOT-text-xl EMBOT-font-medium EMBOT-leading-tight">
              Card title
            </h5>
            <p className="EMBOT-text-base">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
          <ul className="EMBOT-w-full EMBOT-cursor-pointer EMBOT-border-y-2 EMBOT-border-neutral-100">
            <li
              title="button"
              className="EMBOT-w-full EMBOT-text-blue-600 hover:EMBOT-underline EMBOT-border-opacity-100 EMBOT-px-6 EMBOT-py-3 dark:EMBOT-border-white/10"
            >
              Explore Link
            </li>
            <li
              title="button"
              className="EMBOT-w-full EMBOT-text-blue-600 hover:EMBOT-underline EMBOT-cursor-pointer EMBOT-border-y-2 EMBOT-border-neutral-100 EMBOT-border-opacity-100 EMBOT-px-6 EMBOT-py-3 dark:EMBOT-border-white/10"
            >
              Explore Link
            </li>
          </ul>
        </>
      ))}
      <ul className="EMBOT-w-full">
        <li
          title="button"
          className="EMBOT-w-full EMBOT-cursor-pointer EMBOT-border-y-2 EMBOT-border-neutral-100 EMBOT-border-opacity-100 EMBOT-px-6 EMBOT-py-3 dark:EMBOT-border-white/10"
        >
          Dapibus ac facilisis in
        </li>
        <li
          title="button"
          className="EMBOT-w-full EMBOT-cursor-pointer EMBOT-border-b-2 EMBOT-border-neutral-100 EMBOT-border-opacity-100 EMBOT-px-6 EMBOT-py-3 dark:EMBOT-border-white/10"
        >
          Vestibulum at eros
        </li>
      </ul>
    </div>
  );
};

export default SliderTriggerComponent;
