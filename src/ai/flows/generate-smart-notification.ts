'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating personalized smart notifications for users.
 *
 * The flow uses an LLM to create notifications based on user data and activity patterns, such as
 * reminders about missed clock-outs or unusual work patterns. The notifications are tailored to
 * help users better track and manage their time.
 *
 * - generateSmartNotification - A function that generates a smart notification for a user.
 * - GenerateSmartNotificationInput - The input type for the generateSmartNotification function.
 * - GenerateSmartNotificationOutput - The return type for the generateSmartNotification function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSmartNotificationInputSchema = z.object({
  userName: z.string().describe('The name of the user.'),
  missedClockOut: z.boolean().describe('Whether the user missed clocking out.'),
  unusualWorkPattern: z.boolean().describe('Whether the user has an unusual work pattern.'),
});
export type GenerateSmartNotificationInput = z.infer<typeof GenerateSmartNotificationInputSchema>;

const GenerateSmartNotificationOutputSchema = z.object({
  notificationMessage: z.string().describe('The personalized notification message for the user.'),
});
export type GenerateSmartNotificationOutput = z.infer<typeof GenerateSmartNotificationOutputSchema>;

export async function generateSmartNotification(input: GenerateSmartNotificationInput): Promise<GenerateSmartNotificationOutput> {
  return generateSmartNotificationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSmartNotificationPrompt',
  input: {schema: GenerateSmartNotificationInputSchema},
  output: {schema: GenerateSmartNotificationOutputSchema},
  prompt: `You are a helpful assistant that generates personalized smart notifications for users to help them better track and manage their time.

  Based on the following user information, create a concise and helpful notification message.

  User Name: {{{userName}}}
  Missed Clock Out: {{#if missedClockOut}}Yes{{else}}No{{/if}}
  Unusual Work Pattern: {{#if unusualWorkPattern}}Yes{{else}}No{{/if}}

  Notification:`,
});

const generateSmartNotificationFlow = ai.defineFlow(
  {
    name: 'generateSmartNotificationFlow',
    inputSchema: GenerateSmartNotificationInputSchema,
    outputSchema: GenerateSmartNotificationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
