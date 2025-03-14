import PropertyForm from "@/components/forms/PropertyForm";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function AddPage() {

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <PropertyForm />
      </div>
    </ProtectedRoute>
  );
};

