import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class QuizService {

  constructor(private http: HttpClient) { }

  private quizActive = new BehaviorSubject<boolean>(true);
  cast = this.quizActive.asObservable();
  private resultActive = new BehaviorSubject<boolean>(false);
  cast2 = this.resultActive.asObservable();

  changeState = function (metric, state) {
    if (metric === 'quiz'){
      this.quizActive.next(state);
    } else if (metric === 'results'){
      this.resultActive.next(state);
    } else {
      return false;
    }
  };
  correctAnswerapi = [1, 2, 3, 0, 2, 0, 3, 2, 0, 3];
  quizQuestions = [
    {
      type: 'text',
      text: 'Asiste el docente con puntualidad a la clase.',
      possibilities: [
        {
          answer: 'NUNCA'
        },
        {
          answer: 'POCAS VECES'
        },
        {
          answer: 'REGULARMENTE'
        },
        {
          answer: 'GENERALMENTE'
        }
        ,
        {
          answer: 'SIEMPRE'
        }
      ],
      selected: null,
      correct: null
    },
    {
      type: 'text',
      text: 'Explica de forma clara y comprensible el propósito, la metodología de trabajo, el sistema de evaluación de la asignatura, al inicio del módulo.',
      possibilities: [
        {
          answer: 'NUNCA'
        },
        {
          answer: 'POCAS VECES'
        },
        {
          answer: 'REGULARMENTE'
        },
        {
          answer: 'GENERALMENTE'
        }
        ,
        {
          answer: 'SIEMPRE'
        }
      ],
      selected: null,
      correct: null
    },
    {
      type: 'text',
      text: 'El docente evalúa los aprendizajes previos de los estudiantes.',
      possibilities: [
        {
          answer: 'NUNCA'
        },
        {
          answer: 'POCAS VECES'
        },
        {
          answer: 'REGULARMENTE'
        },
        {
          answer: 'GENERALMENTE'
        }
        ,
        {
          answer: 'SIEMPRE'
        }
      ],
      selected: null,
      correct: null
    },
    {
      type: 'text',
      text: 'Demuestra dominio de la asignatura en el desarrollo de cada contenido.',
      possibilities: [
        {
          answer: 'NUNCA'
        },
        {
          answer: 'POCAS VECES'
        },
        {
          answer: 'REGULARMENTE'
        },
        {
          answer: 'GENERALMENTE'
        }
        ,
        {
          answer: 'SIEMPRE'
        }
      ],
      selected: null,
      correct: null
    },
    {
      type: 'text',
      text: 'Explica cada tema de manera completa, con teoría, ejemplos y aclaraciones a los estudiantes.',
      possibilities: [
        {
          answer: 'NUNCA'
        },
        {
          answer: 'POCAS VECES'
        },
        {
          answer: 'REGULARMENTE'
        },
        {
          answer: 'GENERALMENTE'
        }
        ,
        {
          answer: 'SIEMPRE'
        }
      ],
      selected: null,
      correct: null
    },
    {
      type: 'text',
      text: 'Las actividades realizadas están dirigidas a la resolución de problemas del contexto de forma clara y aplicable.',
      possibilities: [
        {
          answer: 'NUNCA'
        },
        {
          answer: 'POCAS VECES'
        },
        {
          answer: 'REGULARMENTE'
        },
        {
          answer: 'GENERALMENTE'
        }
        ,
        {
          answer: 'SIEMPRE'
        }
      ],
      selected: null,
      correct: null
    },
    {
      type: 'text',
      text: 'Realiza actividades donde los estudiantes vinculen la teoría con la práctica de forma efectiva.',
      possibilities: [
        {
          answer: 'NUNCA'
        },
        {
          answer: 'POCAS VECES'
        },
        {
          answer: 'REGULARMENTE'
        },
        {
          answer: 'GENERALMENTE'
        }
        ,
        {
          answer: 'SIEMPRE'
        }
      ],
      selected: null,
      correct: null
    },
    {
      type: 'text',
      text: 'Ayuda a los estudiantes en la realización de las actividades de manera oportuna y precisa.',
      possibilities: [
        {
          answer: 'NUNCA'
        },
        {
          answer: 'POCAS VECES'
        },
        {
          answer: 'REGULARMENTE'
        },
        {
          answer: 'GENERALMENTE'
        }
        ,
        {
          answer: 'SIEMPRE'
        }
      ],
      selected: null,
      correct: null
    },
    {
      type: 'text',
      text: 'Responde a las preguntas que formulan los estudiantes en clase.',
      possibilities: [
        {
          answer: 'NUNCA'
        },
        {
          answer: 'POCAS VECES'
        },
        {
          answer: 'REGULARMENTE'
        },
        {
          answer: 'GENERALMENTE'
        }
        ,
        {
          answer: 'SIEMPRE'
        }
      ],
      selected: null,
      correct: null
    },
    {
      type: 'text',
      text: 'Propicia un clima adecuado para el trabajo colaborativo (equipo) en el aula.',
      possibilities: [
        {
          answer: 'NUNCA'
        },
        {
          answer: 'POCAS VECES'
        },
        {
          answer: 'REGULARMENTE'
        },
        {
          answer: 'GENERALMENTE'
        }
        ,
        {
          answer: 'SIEMPRE'
        }
      ],
      selected: null,
      correct: null
    },
    {
      type: 'text',
      text: 'Utiliza recursos didácticos apropiados para enseñar.',
      possibilities: [
        {
          answer: 'NUNCA'
        },
        {
          answer: 'POCAS VECES'
        },
        {
          answer: 'REGULARMENTE'
        },
        {
          answer: 'GENERALMENTE'
        }
        ,
        {
          answer: 'SIEMPRE'
        }
      ],
      selected: null,
      correct: null
    },
    {
      type: 'text',
      text: 'Proporciona material de apoyo actualizado y contextualizado (textos, fotocopias, libros sitios web).',
      possibilities: [
        {
          answer: 'NUNCA'
        },
        {
          answer: 'POCAS VECES'
        },
        {
          answer: 'REGULARMENTE'
        },
        {
          answer: 'GENERALMENTE'
        }
        ,
        {
          answer: 'SIEMPRE'
        }
      ],
      selected: null,
      correct: null
    },
    {
      type: 'text',
      text: 'Propicia que la clase se desarrolle en un ambiente afectivo, cordial y de confianza.',
      possibilities: [
        {
          answer: 'NUNCA'
        },
        {
          answer: 'POCAS VECES'
        },
        {
          answer: 'REGULARMENTE'
        },
        {
          answer: 'GENERALMENTE'
        }
        ,
        {
          answer: 'SIEMPRE'
        }
      ],
      selected: null,
      correct: null
    },
    {
      type: 'text',
      text: 'Desarrolla la clase de manera predominantemente interactiva, dinámica, motivadora.',
      possibilities: [
        {
          answer: 'NUNCA'
        },
        {
          answer: 'POCAS VECES'
        },
        {
          answer: 'REGULARMENTE'
        },
        {
          answer: 'GENERALMENTE'
        }
        ,
        {
          answer: 'SIEMPRE'
        }
      ],
      selected: null,
      correct: null
    },
    {
      type: 'text',
      text: 'Evalúa los aprendizajes en correspondencia con lo desarrollado en la clase.',
      possibilities: [
        {
          answer: 'NUNCA'
        },
        {
          answer: 'POCAS VECES'
        },
        {
          answer: 'REGULARMENTE'
        },
        {
          answer: 'GENERALMENTE'
        }
        ,
        {
          answer: 'SIEMPRE'
        }
      ],
      selected: null,
      correct: null
    },
    {
      type: 'text',
      text: 'Analizan y socializa los resultados de la evaluación con objetividad y respeto.',
      possibilities: [
        {
          answer: 'NUNCA'
        },
        {
          answer: 'POCAS VECES'
        },
        {
          answer: 'REGULARMENTE'
        },
        {
          answer: 'GENERALMENTE'
        }
        ,
        {
          answer: 'SIEMPRE'
        }
      ],
      selected: null,
      correct: null
    },
    {
      type: 'text',
      text: 'Orienta bibliografía para profundizar en el contenido abordado en la clase.',
      possibilities: [
        {
          answer: 'NUNCA'
        },
        {
          answer: 'POCAS VECES'
        },
        {
          answer: 'REGULARMENTE'
        },
        {
          answer: 'GENERALMENTE'
        }
        ,
        {
          answer: 'SIEMPRE'
        }
      ],
      selected: null,
      correct: null
    },
    {
      type: 'text',
      text: 'Culmina la clase a la hora establecida.',
      possibilities: [
        {
          answer: 'NUNCA'
        },
        {
          answer: 'POCAS VECES'
        },
        {
          answer: 'REGULARMENTE'
        },
        {
          answer: 'GENERALMENTE'
        }
        ,
        {
          answer: 'SIEMPRE'
        }
      ],
      selected: null,
      correct: null
    },
    {
      type: 'text',
      text: 'Orienta los trabajos extra clase (tarea) de manera clara y precisa.',
      possibilities: [
        {
          answer: 'NUNCA'
        },
        {
          answer: 'POCAS VECES'
        },
        {
          answer: 'REGULARMENTE'
        },
        {
          answer: 'GENERALMENTE'
        }
        ,
        {
          answer: 'SIEMPRE'
        }
      ],
      selected: null,
      correct: null
    },
    {
      type: 'text',
      text: 'Cumple con el cronograma de actividades establecidas al inicio del módulo.',
      possibilities: [
        {
          answer: 'NUNCA'
        },
        {
          answer: 'POCAS VECES'
        },
        {
          answer: 'REGULARMENTE'
        },
        {
          answer: 'GENERALMENTE'
        }
        ,
        {
          answer: 'SIEMPRE'
        }
      ],
      selected: null,
      correct: null
    },

  ];
}
