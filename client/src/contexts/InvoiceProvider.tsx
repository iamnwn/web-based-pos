import { createContext, ReactNode, useState } from "react";

type InvoiceProviderProps = {
  children: ReactNode;
};

type InvoiceItem = {
  unitPrice: number;
  StockId: number;
  quantity: number;
  discount: number;
  subTotal: number;
  ProductId: number;
};

type InvoiceContext = {
  increaseInvoiceQuantity: (data) => void;
  invoiceQuantity: number;
  invoiceAmount: number;
  clearInvoice: () => void;
  decreaseInvoiceQuantity: (id) => void;
  invoiceItems: InvoiceItem[];
};

export const InvoiceContext = createContext({} as InvoiceContext);

export function InvoiceProvider({ children }: InvoiceProviderProps) {
  const [invoiceItems, setInvoiceItems] = useState([]);

  // const getTotalInvoiceAmount = () => {
  //   const totalAmount = invoiceItems.reduce((acc, item) => {
  //     const amount =
  //       item.unitPrice * item.quantity -
  //       (item.unitPrice * item.quantity * item.discount) / 100;
  //     return acc + amount;
  //   }, 0);

  //   return totalAmount;
  // };

  function clearInvoice() {
    setInvoiceItems((invoiceItems) => []);
  }

  function decreaseInvoiceQuantity(id) {
    setInvoiceItems(invoiceItems.filter((item) => item.StockId !== id));
  }

  const invoiceQuantity = invoiceItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );
  const invoiceAmount = invoiceItems.reduce(
    (quantity, item) => item.subTotal + quantity,
    0
  );

  // function getItemQuantity(StockId: number) {
  //   return invoiceItems.find((item) => item.StockId === StockId)?.quantity || 0;
  // }
  function increaseInvoiceQuantity(data) {
    setInvoiceItems(() => [...invoiceItems, data]);
  }
  // function decreaseInvoiceQuantity(data) {
  //   setInvoiceItems((invoiceItems) => {
  //     if (
  //       invoiceItems.find((item) => item.StockId === data.StockId)?.quantity ===
  //       1
  //     ) {
  //       return invoiceItems.filter((item) => item.StockId !== data.StockId);
  //     } else {
  //       return invoiceItems.map((item) => {
  //         if (item.StockId === data.StockId) {
  //           return { ...item, quantity: item.quantity - 1 };
  //         } else {
  //           return item;
  //         }
  //       });
  //     }
  //   });
  // }
  // function removeFromInvoice(StockId: number) {
  //   setInvoiceItems((invoiceItems) => {
  //     return invoiceItems.filter((item) => item.StockId !== StockId);
  //   });
  // }

  return (
    <InvoiceContext.Provider
      value={{
        // getItemQuantity,
        increaseInvoiceQuantity,
        decreaseInvoiceQuantity,
        clearInvoice,
        // decreaseInvoiceQuantity,
        // removeFromInvoice,
        invoiceAmount,
        invoiceQuantity,
        invoiceItems,
        // getTotalInvoiceAmount,
      }}>
      {children}
    </InvoiceContext.Provider>
  );
}
