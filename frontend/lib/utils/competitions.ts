import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

export interface Competition {
  id: string;
  title: string;
  organizer: string;
  logo: string;
  gradeEligibility: string;
  deadline: string;
  prize: string;
  status: string;
  description: string;
  applicationType: string;
  applyUrl: string;
  frequency: string;
  dates: [string, string];
  location: string;
  cost: string;
  registrationOpens?: string;
}

const COMPETITIONS_FILE_PATH = join(process.cwd(), "data", "competitions.json");

/**
 * Read all competitions from the local JSON file
 */
export function getAllCompetitions(): Competition[] {
  try {
    const fileContents = readFileSync(COMPETITIONS_FILE_PATH, "utf8");
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Error reading competitions file:", error);
    return [];
  }
}

/**
 * Get competitions sorted by deadline (earliest first)
 */
export function getCompetitionsSortedByDeadline(): Competition[] {
  const competitions = getAllCompetitions();
  return competitions.sort((a, b) => {
    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
  });
}

/**
 * Get a specific competition by ID
 */
export function getCompetitionById(id: string): Competition | null {
  const competitions = getAllCompetitions();
  return competitions.find(comp => comp.id === id) || null;
}

/**
 * Filter competitions based on status
 */
export function getCompetitionsByStatus(status: string): Competition[] {
  const competitions = getAllCompetitions();
  return competitions.filter(comp => comp.status === status);
}

/**
 * Get competitions that are currently open for registration
 */
export function getOpenCompetitions(): Competition[] {
  return getCompetitionsByStatus("open");
}

/**
 * Get competitions that are closing soon
 */
export function getClosingSoonCompetitions(): Competition[] {
  return getCompetitionsByStatus("closing-soon");
}

/**
 * Filter competitions by grade eligibility
 */
export function getCompetitionsByGrade(grade: string): Competition[] {
  const competitions = getAllCompetitions();
  return competitions.filter(comp =>
    comp.gradeEligibility.toLowerCase().includes(grade.toLowerCase())
  );
}

/**
 * Search competitions by title or organizer
 */
export function searchCompetitions(searchTerm: string): Competition[] {
  const competitions = getAllCompetitions();
  const lowerSearchTerm = searchTerm.toLowerCase();

  return competitions.filter(comp =>
    comp.title.toLowerCase().includes(lowerSearchTerm) ||
    comp.organizer.toLowerCase().includes(lowerSearchTerm) ||
    comp.description.toLowerCase().includes(lowerSearchTerm)
  );
}

/**
 * Get competitions by location type (Virtual, In-person, or Hybrid)
 */
export function getCompetitionsByLocation(locationType: string): Competition[] {
  const competitions = getAllCompetitions();
  return competitions.filter(comp =>
    comp.location.toLowerCase().includes(locationType.toLowerCase())
  );
}

/**
 * Get free competitions (cost is "Free")
 */
export function getFreeCompetitions(): Competition[] {
  const competitions = getAllCompetitions();
  return competitions.filter(comp =>
    comp.cost.toLowerCase().includes("free")
  );
}

/**
 * Add a new competition to the local JSON file
 * Note: This is for future use if you want to add competitions programmatically
 */
export function addCompetition(competition: Competition): boolean {
  try {
    const competitions = getAllCompetitions();

    // Check if competition with same ID already exists
    if (competitions.some(comp => comp.id === competition.id)) {
      console.error(`Competition with ID ${competition.id} already exists`);
      return false;
    }

    competitions.push(competition);
    writeFileSync(COMPETITIONS_FILE_PATH, JSON.stringify(competitions, null, 2));
    return true;
  } catch (error) {
    console.error("Error adding competition:", error);
    return false;
  }
}

/**
 * Update an existing competition
 */
export function updateCompetition(id: string, updatedCompetition: Partial<Competition>): boolean {
  try {
    const competitions = getAllCompetitions();
    const index = competitions.findIndex(comp => comp.id === id);

    if (index === -1) {
      console.error(`Competition with ID ${id} not found`);
      return false;
    }

    competitions[index] = { ...competitions[index], ...updatedCompetition };
    writeFileSync(COMPETITIONS_FILE_PATH, JSON.stringify(competitions, null, 2));
    return true;
  } catch (error) {
    console.error("Error updating competition:", error);
    return false;
  }
}

/**
 * Remove a competition by ID
 */
export function removeCompetition(id: string): boolean {
  try {
    const competitions = getAllCompetitions();
    const filteredCompetitions = competitions.filter(comp => comp.id !== id);

    if (filteredCompetitions.length === competitions.length) {
      console.error(`Competition with ID ${id} not found`);
      return false;
    }

    writeFileSync(COMPETITIONS_FILE_PATH, JSON.stringify(filteredCompetitions, null, 2));
    return true;
  } catch (error) {
    console.error("Error removing competition:", error);
    return false;
  }
}

/**
 * Get competitions statistics
 */
export function getCompetitionsStats() {
  const competitions = getAllCompetitions();

  return {
    total: competitions.length,
    open: competitions.filter(c => c.status === "open").length,
    closingSoon: competitions.filter(c => c.status === "closing-soon").length,
    closed: competitions.filter(c => c.status === "closed").length,
    free: competitions.filter(c => c.cost.toLowerCase().includes("free")).length,
    virtual: competitions.filter(c => c.location.toLowerCase().includes("virtual")).length,
    inPerson: competitions.filter(c => c.location.toLowerCase().includes("in-person")).length,
  };
}
