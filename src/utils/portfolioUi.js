import amelegal from '../assets/project/amelegal.png';
import cdejshalom from '../assets/project/cdejshalom.png';
import cta from '../assets/project/cta.png';
import evaa from '../assets/project/evaa.jpg';
import kellele from '../assets/project/kellele.png';
import erpcrm from '../assets/project/erpcrm.png';
import runweek from '../assets/project/runweek.jpg';
import sepamap from '../assets/project/sepamap.jpg';
import spotshimmer from '../assets/project/spotshimmer.jpg';
import lead from '../assets/project/lead.png';
import booking from '../assets/project/booking.jpg';

import {
  BriefcaseBusiness,
  Code2,
  FileText,
  Layers3,
  Lightbulb,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Rocket,
  ShieldCheck,
} from 'lucide-react';

export const projectImages = {
  amelegal,
  cdejshalom,
  cta,
  evaa,
  kellele,
  erpcrm,
  runweek,
  sepamap,
  spotshimmer,
  lead,
  booking,
};

export const resolveProjectImage = (imageKey, imageUrl) => imageUrl || projectImages[imageKey] || amelegal;

export const serviceIconMap = {
  code: Code2,
  layers: Layers3,
  file: FileText,
};

export const highlightIconMap = {
  briefcase: BriefcaseBusiness,
  rocket: Rocket,
  shield: ShieldCheck,
  lightbulb: Lightbulb,
};

export const channelIconMap = {
  mail: Mail,
  phone: Phone,
  message: MessageSquare,
  map: MapPin,
};

export const formatDate = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};
