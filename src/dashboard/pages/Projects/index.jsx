import React, { useState } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const projects = [
  {
    id: 1,
    title: 'Battleship',
    image: '/src/assets/project/cta.png',
    tags: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
    description:
      'Used components of Javascript to implement basic data structures through the game of Battleship...',
    github: '#',
    live: '#',
  },
  {
    id: 2,
    title: 'Movie Titles API',
    image: '/src/assets/project/coddence.png',
    tags: ['HTML', 'CSS', 'JavaScript', 'API', 'Version control'],
    description: 'Uses a public movie API to build a collection movie list...',
    github: '#',
    live: '#',
  },
  {
    id: 3,
    title: 'Javascript Calculator',
    image: '/src/assets/project/amelegal.png',
    tags: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
    description:
      'Uses simple algorithm concepts in Javascript to produce an arithmetic result in a terminal.',
    github: '#',
    live: '#',
  },
];

const Index = () => {
  const [editingProject, setEditingProject] = useState(null);
  const [deletingProject, setDeletingProject] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEditClick = (project) => {
    setEditingProject(project);
    setShowEditModal(true);
  };

  const handleDeleteClick = (project) => {
    setDeletingProject(project);
    setShowDeleteModal(true);
  };

  const handleUpdateProject = () => {
    setShowEditModal(false);
    setEditingProject(null);
  };

  const handleDeleteProject = () => {
    setShowDeleteModal(false);
    setDeletingProject(null);
  };

  return (
    <div className="p-6 pt-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow-sm p-6 flex flex-col justify-between h-full transition hover:shadow-md"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-bold text-[#0b1743]">{project.title}</h3>
            <p className="text-sm text-gray-700 my-2">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between mt-auto">
              <div className="flex gap-4">
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub className="text-xl text-gray-700 hover:text-black" />
                </a>
                <a href={project.live} target="_blank" rel="noopener noreferrer">
                  <FaExternalLinkAlt className="text-xl text-gray-700 hover:text-blue-600" />
                </a>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => handleEditClick(project)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDeleteClick(project)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showEditModal && editingProject && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg relative">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Modifier le projet</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateProject();
              }}
            >
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Titre *
                </label>
                <input
                  type="text"
                  value={editingProject.title}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, title: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Description *
                </label>
                <textarea
                  value={editingProject.description}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      description: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="text-red-600 hover:underline"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Mettre à jour
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteModal && deletingProject && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4 text-gray-800">
              Confirmer la suppression
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Es-tu sûr de vouloir supprimer le projet "{deletingProject.title}" ?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-600 hover:underline"
              >
                Annuler
              </button>
              <button
                onClick={handleDeleteProject}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
