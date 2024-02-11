"use client";

import { RoleGate } from "@/components/auth/role-gate";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormSuccess } from "@/components/ui/form-success";

const AdminPage = () => {
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-semibold">
          🔑 Admin
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole="ADMIN">
          <FormSuccess message="You are allowed to see this content" />
        </RoleGate>
        <div className="items-centeer flex flex-row justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only API route</p>
          <Button>Click to test</Button>
        </div>
        <div className="items-centeer flex flex-row justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only server action</p>
          <Button>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
