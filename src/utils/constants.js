const defaultFacultyStructure = (id) => {
  return {
    where: {
      id,
    },
    select: {
      uuid: true,
      id: true,
      name: true,
      email: true,
      image: true,
      designation: true,
      department: true,
      school: true,
      educationalDetails: {
        orderBy: {
          id: "asc",
        },
        select: {
          id: true,
          degree: true,
          university: true,
          graduatedIn: true,
        },
      },
      researchDetails: {
        select: {
          specialization: true,
          orcid: true,
          scopus: true,
          googleScholar: true,
          hIndex: true,
          i10Index: true,
        },
      },
      patentPublishedDetails: {
        orderBy: {
          id: "asc",
        },
        select: {
          id: true,
          title: true,
          applicationNumber: true,
        },
      },
    },
  };
};

module.exports = { defaultFacultyStructure };
