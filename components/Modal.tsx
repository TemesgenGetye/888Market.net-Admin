import { ReactNode, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Loader from "./Loader";
import SubmitButton from "./SubmitButton";

interface ModalProps {
  isVisible: boolean;
  title: string;
  description: string;
  isLoading?: boolean;
  confirmLable?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function Modal({
  isVisible,
  title,
  description,
  isLoading,
  confirmLable = "Confirm",
  onConfirm,
  onCancel,
}: ModalProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[400px]">
        <h3 className="text-lg font-bold mb-4">{title}</h3>
        <p className="text-sm text-gray-600 mb-6">{description}</p>
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={onCancel} className="w-[80px]">
            Cancel
          </Button>
          <SubmitButton
            label={confirmLable}
            onClick={onConfirm}
            className="!w-[100px] rounded-md bg-red-600 hover:bg-red-700 text-white p-0 min-w-[90px]"
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
