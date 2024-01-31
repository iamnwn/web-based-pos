import useLocalStorage from "@/hooks/useLocalStorage";
import { createContext, ReactNode, useContext, useState } from "react";

type ShoppingCartProviderProps = {
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
  getItemQuantity: (StockId: number) => number;
  increaseInvoiceQuantity: (StockId: number) => void;
  decreaseInvoiceQuantity: (StockId: number) => void;
  removeFromInvoice: (StockId: number) => void;
  getTotalInvoiceAmount: () => number;
  invoiceQuantity: number;
  invoiceItems: InvoiceItems[];
};

export const InvoiceContext = createContext({} as InvoiceContext);

export function InvoiceProvider({ children }: ShoppingCartProviderProps) {
  const [invoiceItems, setInvoiceItems] = useLocalStorage<InvoiceItems[]>(
    "invoice-item",
    []
  );

  const getTotalInvoiceAmount = () => {
    const totalAmount = invoiceItems.reduce((acc, item) => {
      const amount =
        item.unitPrice * item.quantity -
        (item.unitPrice * item.quantity * item.discount) / 100;
      return acc + amount;
    }, 0);

    return totalAmount;
  };

  const invoiceQuantity = invoiceItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  function getItemQuantity(StockId: number) {
    return invoiceItems.find((item) => item.StockId === StockId)?.quantity || 0;
  }
  function increaseInvoiceQuantity(StockId: number) {
    setInvoiceItems((currItems) => {
      if (currItems.find((item) => item.StockId === StockId) == null) {
        return [...currItems, { StockId, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.StockId === StockId) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function decreaseInvoiceQuantity(StockId: number) {
    setInvoiceItems((currItems) => {
      if (currItems.find((item) => item.StockId === StockId)?.quantity === 1) {
        return currItems.filter((item) => item.StockId !== StockId);
      } else {
        return currItems.map((item) => {
          if (item.StockId === StockId) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function removeFromInvoice(StockId: number) {
    setInvoiceItems((currItems) => {
      return currItems.filter((item) => item.StockId !== StockId);
    });
  }

  return (
    <InvoiceContext.Provider
      value={{
        getItemQuantity,
        increaseInvoiceQuantity,
        decreaseInvoiceQuantity,
        removeFromInvoice,
        invoiceQuantity,
        invoiceItems,
        getTotalInvoiceAmount,
      }}>
      {children}
    </InvoiceContext.Provider>
  );
}
