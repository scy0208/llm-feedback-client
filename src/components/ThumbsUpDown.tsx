'use client'

import { Client } from '../index';
import React, { useState, FC } from 'react';

import { Theme, Popover, Button, Flex, Box, TextArea } from '@radix-ui/themes';


interface Props {
    client: Client;
    contentId: string;
}

const ThumbsUpDown: FC<Props> = ({
    client,
    contentId
}) => {

    const [score, setScore] = useState<number>(0);
    const [comment, setComment] = useState<string>('');

    const ThumbsUpSvg = (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            className="lucide lucide-thumbs-up">
            <path d="M7 10v12" />
            <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
        </svg>
    );

    const ThumbsDownSvg = (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            className="lucide lucide-thumbs-down">
            <path d="M17 14V2" />
            <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
        </svg>
    );

    return (
        <Theme>
            <Popover.Root>
                <Popover.Trigger>
                    <Button size="2" variant="outline">
                        {ThumbsUpSvg}
                        {ThumbsDownSvg}
                    </Button>
                </Popover.Trigger>
                <Popover.Content style={{ width: 360 }}>
                    <Flex gap="3">
                        <Box grow="1">
                            <TextArea placeholder="Write a comment…" style={{ height: 80 }} defaultValue={comment} onChange={(e) => setComment(e.target.value)} />
                            <Flex gap="3" mt="3" justify="between">
                                <Flex align="center" gap="2" asChild>
                                    <label>
                                        <Button size="2" variant={score === 1 ? "solid" : "outline"} onClick={() => setScore(1)}>
                                            {ThumbsUpSvg}
                                        </Button>
                                        <Button size="1" variant={score === -1 ? "solid" : "outline"} onClick={() => setScore(-1)}>
                                            {ThumbsDownSvg}
                                        </Button>
                                    </label>
                                </Flex>
                                <Popover.Close>
                                    <Button size="2" onClick={() => {
                                        client.createFeedback({
                                            contentId,
                                            key: 'thumbs-up-down',
                                            score,
                                            comment
                                        })
                                    }}>Submit</Button>
                                </Popover.Close>
                            </Flex>
                        </Box>
                    </Flex>
                </Popover.Content>
            </Popover.Root>
        </Theme>
    )
};

export default ThumbsUpDown;