"use server";

import { revalidatePath } from "next/cache";

export async function getApplications({
  admission = "",
  user = "",
  batch = "",
  course = "",
}) {
  let applications = await fetch(
    `${process.env.BASE_URL}/api/application?admission=${admission || ""}&user=${
      user || ""
    }&batch=${batch || ""}&course=${course || ""}`,
    {
      cache: "no-cache",
    }
  );
  applications = await applications.json();
  return applications;
}

export async function addApplication(obj) {

  const batch = await fetch(`${process.env.BASE_URL}/api/application`, {
    method: "POST",
    body: JSON.stringify(obj),
    cache: "no-cache",
  });
  return await batch.json();
}

export async function updateApplication(id, status, admissionId) {
  const batch = await fetch(`${process.env.BASE_URL}/api/application`, {
    method: "PUT",
    body: JSON.stringify({
      id,
      status,
    }),
  });
  if (batch.ok) {
    revalidatePath(`/admin/admissions/${admissionId}`);
  }
}

export async function getApplicationsLength() {
  let applications = await fetch(
    `${process.env.BASE_URL}/api/application`
  );
  applications = await applications.json();
  return applications;
}

export async function getSingleApplication(id) {
  let userApplications = await fetch(`${process.env.BASE_URL}/api/application/${id}`,{cache:"no-cache"});
  userApplications  = await userApplications.json();
  return  userApplications ;
}