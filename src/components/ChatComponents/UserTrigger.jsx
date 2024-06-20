import React from "react";

const UserTrigger = (props) => {
  console.log("userTrigger", props);
  return (
    <div className="EMBOT-flex EMBOT-my-2 EMBOT-items-end EMBOT-just-end EMBOT-flex-col EMBOT-w-full EMBOT-leading-1.5">
      <p
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgb(42, 39, 218) 0%, rgb(0, 204, 255) 100%)",
          color: "white",
        }}
        className="EMBOT-text-sm EMBOT-font-normal EMBOT-py-2.5 EMBOT-px-2 EMBOT-text-gray-900 EMBOT-rounded-s-xl EMBOT-rounded-ee-xl EMBOT-dark:text-white EMBOT-border-gray-200"
      >
        hello
      </p>
    </div>
  );
};

export default UserTrigger;
