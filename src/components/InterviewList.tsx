import React from 'react';
import InterviewListItem from './InterviewListItem';
import { List } from './ui';

type Interview = {
  id: string;
  date: Date | string;
  time: string | null;
  type: string;
  location: string | null;
  round: number | null;
  status: string;
  application: {
    id: string;
    company: string;
    position: string;
    status: string;
  };
};

interface Props {
  readonly interviews: Interview[];
}

export default function InterviewList({ interviews }: Props) {
  return (
    <List>
      {interviews.map((interview) => (
        <InterviewListItem key={interview.id} interview={interview} />
      ))}
    </List>
  );
}
