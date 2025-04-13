<?php

namespace App\Mail;

use App\Models\Event;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class InscriptionConfirmee extends Mailable
{
    use Queueable, SerializesModels;

    public $event;

    /**
     * Crée une nouvelle instance.
     */
    public function __construct(Event $event)
    {
        $this->event = $event;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->subject('Confirmation de votre inscription à : ' . $this->event->titre)
            ->markdown('emails.inscription_confirmee');
    }
}
