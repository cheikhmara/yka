// ClasseMoyenne.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClasseMoyenne = ({ eleveId }) => {
  const [moyennes, setMoyennes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer les informations de l'élève
        const eleveResponse = await axios.get(`https://your-directus-instance/items/Eleve/${eleveId}`);
        const eleve = eleveResponse.data.data;

        // Récupérer tous les élèves de la même classe
        const classeResponse = await axios.get(`https://your-directus-instance/items/Eleve?filter[classe_id][_eq]=${eleve.classe_id}`);
        const eleves = classeResponse.data.data;

        // Récupérer toutes les évaluations de ces élèves
        const elevesIds = eleves.map(eleve => eleve.id).join(',');
        const evaluationsResponse = await axios.get(`https://your-directus-instance/items/Evaluation?filter[eleve_id][_in]=${elevesIds}`);
        const evaluations = evaluationsResponse.data.data;

        // Calculer la moyenne des notes pour chaque matière
        const matieres = {};
        evaluations.forEach(evaluation => {
          const { matiere_id, note } = evaluation;
          if (!matieres[matiere_id]) {
            matieres[matiere_id] = { total: 0, count: 0 };
          }
          matieres[matiere_id].total += note;
          matieres[matiere_id].count += 1;
        });

        const moyennesCalc = {};
        for (const matiere in matieres) {
          moyennesCalc[matiere] = matieres[matiere].total / matieres[matiere].count;
        }

        setMoyennes(moyennesCalc);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [eleveId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Moyennes des matières pour la classe de l'élève ID {eleveId}</h2>
      <ul>
        {Object.entries(moyennes).map(([matiere, moyenne]) => (
          <li key={matiere}>Matière {matiere} : {moyenne.toFixed(2)}</li>
        ))}
      </ul>
    </div>
  );
};

export default ClasseMoyenne;
