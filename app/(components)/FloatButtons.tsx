"use client"

import { Icon } from "@iconify/react/dist/iconify.js"

const FloatButtons = () => {
  return (
    <div className="fixed flex flex-col right-2 bottom-2 gap-2 z-50">
      <div className="flex justify-end">
        <a
          onClick={() => window.scrollTo(0, 0)}
          className="bg-[#141313] rounded-full p-2 hover:bg-[#141313]/90 flex justify-center items-center cursor-pointer"
        >
          <Icon
            icon="formkit:arrowup"
            width="40"
            height="40"
            color="#fff"
          />
        </a>
      </div>
      <div>
        <div className="flex justify-end">
          <a
            href="https://wa.me/5491162569879"
            className="bg-[#25d366] rounded-full p-2 hover:bg-[#25d366]/90"
            target="_blank"
          >
            <Icon
              icon="ic:baseline-whatsapp"
              width="40"
              height="40"
              color="#fff"
            />
          </a>
        </div>
      </div>
    </div>
  )
}
export default FloatButtons
