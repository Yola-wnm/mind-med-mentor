export interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface Question {
  id: string;
  category: string;
  question: string;
  answers: Answer[];
  generalExplanation: string;
}

export const medicalQuestions: Question[] = [
  // Zaburzenia spostrzegania
  {
    id: "1",
    category: "Zaburzenia spostrzegania",
    question: "Który lek jest najskuteczniejszy w leczeniu halucynacji i omamów?",
    answers: [
      {
        id: "a",
        text: "Rysperydon",
        isCorrect: true,
        explanation: "Rysperydon to lek przeciwpsychotyczny atypowy, który blokuje receptory dopaminowe (D2) i serotoninowe, skutecznie hamując występowanie omamów i halucynacji."
      },
      {
        id: "b",
        text: "Lewodopa",
        isCorrect: false,
        explanation: "Lewodopa jest przeciwwskazana - pobudza układ dopaminowy, co może prowokować lub nasilać objawy psychotyczne."
      },
      {
        id: "c",
        text: "Kortykosteroidy",
        isCorrect: false,
        explanation: "Kortykosteroidy są przeciwwskazane - u niektórych pacjentów mogą powodować zaburzenia psychotyczne, w tym omamy."
      }
    ],
    generalExplanation: "Leki przeciwpsychotyczne atypowe jak rysperydon i olanzapina są pierwszą linią leczenia zaburzeń spostrzegania dzięki działaniu na receptory dopaminowe i serotoninowe."
  },
  
  // Zaburzenia pamięci
  {
    id: "2",
    category: "Zaburzenia pamięci",
    question: "Jakie leki są stosowane w leczeniu zaburzeń pamięci związanych z chorobą Alzheimera?",
    answers: [
      {
        id: "a",
        text: "Benzodiazepiny",
        isCorrect: false,
        explanation: "Benzodiazepiny są przeciwwskazane - powodują sedację i pogorszenie funkcji poznawczych, zaburzają procesy zapamiętywania."
      },
      {
        id: "b",
        text: "Donepezil",
        isCorrect: true,
        explanation: "Donepezil to inhibitor acetylocholinesterazy, który zwiększa ilość acetylocholiny w mózgu, wspomaga pamięć i funkcje poznawcze."
      },
      {
        id: "c",
        text: "Amitryptylina",
        isCorrect: false,
        explanation: "Amitryptylina ma działanie antycholinergiczne, które blokuje działanie acetylocholiny i wyraźnie pogarsza pamięć."
      }
    ],
    generalExplanation: "Inhibitory acetylocholinesterazy (donepezil, riwastygmina) są podstawą farmakoterapii zaburzeń pamięci w chorobie Alzheimera."
  },

  // Zaburzenia myślenia
  {
    id: "3",
    category: "Zaburzenia myślenia",
    question: "Które leki są najskuteczniejsze w leczeniu urojeń i myślenia schizofrennego?",
    answers: [
      {
        id: "a",
        text: "Klozapina",
        isCorrect: true,
        explanation: "Klozapina to neuroleptyk blokujący receptory dopaminowe, który pomaga w opanowaniu urojeń i dezorganizacji myślenia charakterystycznych dla psychoz."
      },
      {
        id: "b",
        text: "Amfetamina",
        isCorrect: false,
        explanation: "Amfetamina jest przeciwwskazana - zwiększa poziom dopaminy, co może prowokować lub pogłębiać urojenia."
      },
      {
        id: "c",
        text: "Metylofenidat",
        isCorrect: false,
        explanation: "Metylofenidat jako stymulant zwiększa poziom dopaminy i może nasilać objawy psychotyczne."
      }
    ],
    generalExplanation: "Neuroleptyki (klozapina, haloperidol) blokują receptory dopaminowe i są kluczowe w leczeniu zaburzeń myślenia w psychozach."
  },

  // Zaburzenia aktywności ruchowej
  {
    id: "4",
    category: "Zaburzenia aktywności ruchowej",
    question: "Który lek jest najbezpieczniejszy w leczeniu katatonii?",
    answers: [
      {
        id: "a",
        text: "Lorazepam",
        isCorrect: true,
        explanation: "Lorazepam to benzodiazepina skutecznie redukująca napięcie i objawy katatoniczne bez ryzyka złośliwego zespołu neuroleptycznego."
      },
      {
        id: "b",
        text: "Trójpierścieniowe leki przeciwdepresyjne",
        isCorrect: false,
        explanation: "TLPD są przeciwwskazane - mogą nasilać pobudzenie, wywoływać manię lub prowadzić do zaburzeń rytmu serca."
      },
      {
        id: "c",
        text: "Depotowe neuroleptyki fenotiazynowe",
        isCorrect: false,
        explanation: "Te leki w katatonii mogą pogarszać stan, wywołując złośliwy zespół neuroleptyczny."
      }
    ],
    generalExplanation: "W katatonii lorazepam jest często pierwszym wyborem ze względu na bezpieczeństwo i skuteczność."
  },

  // Zaburzenia uczuciowości
  {
    id: "5",
    category: "Zaburzenia uczuciowości",
    question: "Jaki lek jest najlepszy jako stabilizator nastroju w chorobie afektywnej dwubiegunowej?",
    answers: [
      {
        id: "a",
        text: "Kortykosteroidy",
        isCorrect: false,
        explanation: "Kortykosteroidy są przeciwwskazane - mogą wywołać epizody maniakalne."
      },
      {
        id: "b",
        text: "Lit",
        isCorrect: true,
        explanation: "Lit to klasyczny stabilizator nastroju, który zapobiega nawrotom depresji i manii w chorobie afektywnej dwubiegunowej."
      },
      {
        id: "c",
        text: "Reboksetyna",
        isCorrect: false,
        explanation: "Reboksetyna może nasilać lęk i nie jest skuteczna w depresji z dużym lękiem."
      }
    ],
    generalExplanation: "Lit pozostaje złotym standardem w profilaktyce epizodów w chorobie afektywnej dwubiegunowej."
  },

  // Zaburzenia świadomości
  {
    id: "6",
    category: "Zaburzenia świadomości",
    question: "Który lek jest najlepszy w leczeniu delirium?",
    answers: [
      {
        id: "a",
        text: "Benzodiazepiny",
        isCorrect: false,
        explanation: "Benzodiazepiny pogłębiają zaburzenia świadomości (z wyjątkiem delirium tremens w odstawieniu alkoholu)."
      },
      {
        id: "b",
        text: "Haloperidol",
        isCorrect: true,
        explanation: "Haloperidol jest najlepszy w szybkim hamowaniu objawów delirium bez nadmiernej sedacji, zachowując przytomność pacjenta."
      },
      {
        id: "c",
        text: "Leki antycholinergiczne",
        isCorrect: false,
        explanation: "Leki antycholinergiczne silnie pogarszają orientację i mogą wywołać lub nasilić majaczenie."
      }
    ],
    generalExplanation: "W delirium haloperidol jest lekiem pierwszego wyboru ze względu na skuteczność bez nadmiernej sedacji."
  },

  // Choroba Alzheimera
  {
    id: "7",
    category: "Choroba Alzheimera",
    question: "Które leki są podstawą farmakoterapii w chorobie Alzheimera?",
    answers: [
      {
        id: "a",
        text: "Donepezil i Memantyna",
        isCorrect: true,
        explanation: "Donepezil (inhibitor acetylocholinesterazy) zwiększa acetylocholinę, a memantyna (antagonista NMDA) chroni przed toksycznym działaniem glutaminianu."
      },
      {
        id: "b",
        text: "Benzodiazepiny",
        isCorrect: false,
        explanation: "Benzodiazepiny pogarszają pamięć, zwiększają ryzyko upadków i splątania u pacjentów z otępieniem."
      },
      {
        id: "c",
        text: "Leki antycholinergiczne",
        isCorrect: false,
        explanation: "Leki antycholinergiczne pogarszają funkcje poznawcze, są przeciwstawne działaniu donepezilu."
      }
    ],
    generalExplanation: "Terapia choroby Alzheimera opiera się na dwóch mechanizmach: wzmocnieniu cholinergicznym i neuroprotekcji glutaminianowej."
  },

  // Otępienie z ciałami Lewy'ego
  {
    id: "8",
    category: "Otępienie z ciałami Lewy'ego",
    question: "Których leków należy unikać w otępieniu z ciałami Lewy'ego?",
    answers: [
      {
        id: "a",
        text: "Riwastygmina",
        isCorrect: false,
        explanation: "Riwastygmina jest wskazana - wzmacnia sygnalizację cholinergiczną i poprawia funkcje poznawcze oraz zachowania."
      },
      {
        id: "b",
        text: "Haloperidol",
        isCorrect: true,
        explanation: "Haloperidol może wywołać ciężkie powikłania pozapiramidowe (sztywność, drżenie, złośliwy zespół neuroleptyczny) w tym typie otępienia."
      },
      {
        id: "c",
        text: "Donepezil",
        isCorrect: false,
        explanation: "Donepezil jest wskazany w tym schorzeniu - pomaga w poprawie funkcji poznawczych."
      }
    ],
    generalExplanation: "W otępieniu z ciałami Lewy'ego szczególnie niebezpieczne są klasyczne neuroleptyki ze względu na wrażliwość na działania niepożądane."
  }
];

export default medicalQuestions;