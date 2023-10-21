import Image from "next/image";

export default function FlashloanExample() {
  const code = `pragma solidity ^0.8.20;

  interface IERC20 {
      function balanceOf(address account) external view returns (uint256);
      function transfer(address recipient, uint256 amount) external returns (bool);
      function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
      function approve(address spender, uint256 amount) external returns (bool);
  }

  contract SimpleFlashLoan {
      function receiveFlashLoan(address token ,address vaultAddress, uint24 fee, uint256 borrowAmount) external {
          // Perform actions with borrowed funds

          // Make sure to repay the loan before the end of the transaction
          IERC20(token).approve(vaultAddress, borrowAmount + (borrowAmount * fee / (10^5)));
      }
  }`

  return (
    <>
    <button className="btn" onClick={()=>
        // @ts-ignore
        document.getElementById('flashloanexample').showModal()
      }>Example of FlashLoan Contract</button>
      <dialog id="flashloanexample" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">Example of FlashLoan Contract</h3>
          <div className="flex flex-col w-full h-full">
          <div className="flex justify-between bg-base-300 mt-4">
            <pre className="bg-base-300">
              Solidity
            </pre>
            <button
              className="inline-flex bg-base-300 items-center px-4 py-2"
              onClick={() => {
                navigator.clipboard.writeText(code);
              }}
            >
              <Image height={24} width={24} src="/svg/copy.svg" alt="copy"/>
            </button>
          </div>
            <pre className="flex-grow overflow-auto p-4 text-lg leading-6">
              {code}
            </pre>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  )
}
