export const buildStudyPlanPrompt = (
  syllabusText,
  topics,
  days,
  difficulty
) => {
  const topicList = topics.length ? topics.join(", ") : "No topics detected.";

  return `
You are an expert AI tutor. Create a complete ${days}-day study plan.
Difficulty level: ${difficulty}

### Syllabus Summary:
${syllabusText.slice(0, 2000)}  // keep it short to avoid crashing

### Key Topics:
${topicList}

### Requirements:
- Break the study plan **day-wise**
- Each day must include:
  - Topics to study
  - Learning objectives
  - Recommended resources (YouTube, websites)
  - Practice questions
- Make it structured, simple, and exam-oriented.

### Format:
Day 1:
  - Topics:
  - Objectives:
  - Resources:
  - Practice:

Day 2:
...
`;
};
