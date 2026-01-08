import JobActions from "./job-actions";

interface JobData {
  id: number;
  title: string;
  description: string;
  location: string;
  isActive: boolean;
  required_skills: string[];
}

async function getJobs(): Promise<JobData[]> {
  const response = await fetch(
    "https://ai-recruitment-backend-gdgoc.vercel.app/api/job-vacancies",
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }

  const results = await response.json();
  return results.data || results;
}

export default async function JobCard() {
  const data = await getJobs();
  return (
    <div className="flex flex-row flex-wrap p-8 gap-4">
      {data.map((job: JobData, index) => (
        <div key={index} className="border p-4 mb-4 rounded shadow">
          <div className="flex flex-row gap-4">
            <h4 className="text-lg font-semibold">{job.title}</h4>
            <JobActions job={job} />
          </div>
          <p className="text-gray-600">{job.description}</p>
          <p className="text-gray-500">{job.location}</p>
          <p className={job.isActive ? "text-green-500" : "text-red-500"}>
            {job.isActive ? "Active" : "Inactive"}
          </p>
          <p className="text-sm text-gray-700">Requirements:</p>
          {job.required_skills && job.required_skills.length > 0 ? (
            job.required_skills.map((req, reqIndex) => (
              <li key={reqIndex} className="text-sm text-gray-600">
                {req}
              </li>
            ))
          ) : (
            <p className="text-sm text-gray-600">No specific requirements</p>
          )}
        </div>
      ))}
    </div>
  );
}
